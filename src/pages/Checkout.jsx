import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CreditCard, Edit3, MapPin, Plus, Tag, Trash2, Truck, X } from 'lucide-react'
import { EmptyState } from '../components/commerce/EmptyState'
import { PaymentProcessing } from '../components/checkout/PaymentProcessing'
import { StepProgress } from '../components/checkout/StepProgress'
import { paymentMethods, products } from '../data'
import { useAppStore } from '../store/useAppStore'
import { useToastStore } from '../store/useToastStore'
import { getCartItems, getCheckoutTotals } from '../utils/checkout'
import { formatCurrency } from '../utils/formatters'

const blankAddress = {
  label: 'Home',
  fullName: '',
  phone: '',
  pincode: '',
  state: '',
  city: '',
  address: '',
  landmark: '',
}

export function Checkout() {
  const navigate = useNavigate()
  const cart = useAppStore((state) => state.cart)
  const addresses = useAppStore((state) => state.addresses)
  const selectedAddressId = useAppStore((state) => state.selectedAddressId)
  const selectAddress = useAppStore((state) => state.selectAddress)
  const addAddress = useAppStore((state) => state.addAddress)
  const updateAddress = useAppStore((state) => state.updateAddress)
  const deleteAddress = useAppStore((state) => state.deleteAddress)
  const paymentMethod = useAppStore((state) => state.paymentMethod)
  const selectPaymentMethod = useAppStore((state) => state.selectPaymentMethod)
  const appliedCoupon = useAppStore((state) => state.appliedCoupon)
  const couponError = useAppStore((state) => state.couponError)
  const applyCoupon = useAppStore((state) => state.applyCoupon)
  const clearCoupon = useAppStore((state) => state.clearCoupon)
  const placeOrder = useAppStore((state) => state.placeOrder)
  const showToast = useToastStore((state) => state.showToast)
  const items = useMemo(() => getCartItems(cart, products), [cart])
  const totals = useMemo(() => getCheckoutTotals(items, appliedCoupon), [items, appliedCoupon])
  const [coupon, setCoupon] = useState('')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [paymentState, setPaymentState] = useState('idle')

  if (!items.length) {
    return <EmptyState title="Checkout is empty" description="Add products to your cart before starting checkout." />
  }

  const saveAddress = (address) => {
    if (address.id) updateAddress(address.id, address)
    else addAddress(address)
    showToast('Address saved')
    setSheetOpen(false)
    setEditingAddress(null)
  }

  const handleCoupon = () => {
    applyCoupon(coupon)
    const normalized = coupon.trim().toUpperCase()
    if (['WELCOME10', 'ARBOREA20', 'FREESHIP'].includes(normalized)) {
      showToast('Coupon applied')
    } else {
      showToast('Invalid coupon code')
    }
  }

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      showToast('Add a delivery address')
      return
    }
    setPaymentState('processing')
    window.setTimeout(() => {
      const orderId = placeOrder({ totals })
      showToast('Payment successful')
      window.setTimeout(() => showToast('Order placed'), 250)
      setPaymentState('success')
      window.setTimeout(() => navigate(`/order-success/${orderId}`), 850)
    }, 1400)
  }

  return (
    <div className="pb-28 lg:pb-0">
      <div className="mb-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-clay">Secure checkout</p>
        <h1 className="font-display text-4xl font-bold text-ink">Checkout</h1>
      </div>
      <StepProgress active={1} />

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_390px] lg:items-start">
        <main className="space-y-5">
          <CheckoutSection title="Delivery Address" actionLabel="Add new" onAction={() => setSheetOpen(true)}>
            {addresses.length ? (
              <div className="grid gap-3">
                {addresses.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    selected={selectedAddressId === address.id}
                    onSelect={() => selectAddress(address.id)}
                    onEdit={() => {
                      setEditingAddress(address)
                      setSheetOpen(true)
                    }}
                    onDelete={() => {
                      deleteAddress(address.id)
                      showToast('Address deleted')
                    }}
                  />
                ))}
              </div>
            ) : (
              <EmptyState title="No addresses" description="Add a delivery address to continue checkout." actionLabel="Add address" />
            )}
          </CheckoutSection>

          <CheckoutSection title="Payment Method">
            <div className="grid gap-3 sm:grid-cols-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => selectPaymentMethod(method.id)}
                  className={`rounded-[1.5rem] border p-4 text-left transition ${
                    paymentMethod === method.id ? 'border-moss bg-moss text-white shadow-soft' : 'border-stone-100 bg-white text-ink shadow-soft'
                  }`}
                >
                  <CreditCard size={22} className={paymentMethod === method.id ? 'text-rose' : 'text-clay'} />
                  <p className="mt-3 font-extrabold">{method.label}</p>
                  <p className={`mt-1 text-sm ${paymentMethod === method.id ? 'text-white/70' : 'text-stone-500'}`}>
                    {method.description}
                  </p>
                </button>
              ))}
            </div>
          </CheckoutSection>
        </main>

        <aside className="sticky top-24 rounded-[2rem] bg-white p-5 shadow-soft">
          <OrderSummary
            items={items}
            totals={totals}
            coupon={coupon}
            setCoupon={setCoupon}
            couponError={couponError}
            appliedCoupon={appliedCoupon}
            onApply={handleCoupon}
            onClear={clearCoupon}
          />
          <button
            onClick={handlePlaceOrder}
            className="mt-5 hidden h-12 w-full items-center justify-center rounded-full bg-moss px-5 text-sm font-extrabold text-white shadow-soft lg:inline-flex"
          >
            Place Order
          </button>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 flex items-center justify-between gap-3 border-t border-stone-200 bg-white px-4 py-3 shadow-[0_-4px_14px_rgba(24,23,22,0.05)] lg:hidden">
        <div>
          <p className="text-xs font-bold text-stone-500">Total</p>
          <p className="text-lg font-black text-ink">{formatCurrency(totals.total)}</p>
        </div>
        <button onClick={handlePlaceOrder} className="h-12 rounded-full bg-moss px-6 text-sm font-extrabold text-white shadow-soft">
          Place Order
        </button>
      </div>

      <AddressSheet
        open={sheetOpen}
        initial={editingAddress}
        onClose={() => {
          setSheetOpen(false)
          setEditingAddress(null)
        }}
        onSave={saveAddress}
      />
      <PaymentProcessing state={paymentState} />
    </div>
  )
}

function CheckoutSection({ title, children, actionLabel, onAction }) {
  return (
    <section className="rounded-[2rem] bg-white p-4 shadow-soft sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-3xl font-bold">{title}</h2>
        {actionLabel ? (
          <button onClick={onAction} className="inline-flex h-10 items-center gap-2 rounded-full bg-cream px-4 text-sm font-extrabold text-ink">
            <Plus size={16} />
            {actionLabel}
          </button>
        ) : null}
      </div>
      {children}
    </section>
  )
}

function AddressCard({ address, selected, onSelect, onEdit, onDelete }) {
  return (
    <article className={`rounded-[1.5rem] border p-4 ${selected ? 'border-ink bg-cream' : 'border-stone-100 bg-white'}`}>
      <button type="button" onClick={onSelect} className="w-full text-left">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-extrabold text-ink">{address.label} - {address.fullName}</p>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              {address.address}, {address.city}, {address.state} - {address.pincode}
            </p>
            <p className="mt-1 text-sm font-bold text-stone-500">Phone: {address.phone}</p>
          </div>
          <span className={`h-5 w-5 rounded-full border-4 ${selected ? 'border-ink bg-white' : 'border-stone-300'}`} />
        </div>
      </button>
      <div className="mt-4 flex gap-2">
        <button onClick={onEdit} className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-3 text-xs font-extrabold text-ink shadow-sm">
          <Edit3 size={14} /> Edit
        </button>
        <button onClick={onDelete} className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-3 text-xs font-extrabold text-clay shadow-sm">
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </article>
  )
}

function OrderSummary({ items, totals, coupon, setCoupon, couponError, appliedCoupon, onApply, onClear }) {
  return (
    <>
      <h2 className="font-display text-3xl font-bold">Order Summary</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.productId} className="flex gap-3 rounded-[1.25rem] bg-cream p-3">
            <img src={item.product.image} alt={item.product.name} className="h-16 w-14 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-extrabold">{item.product.name}</p>
              <p className="text-xs text-stone-500">Qty {item.quantity}</p>
            </div>
            <p className="text-sm font-black">{formatCurrency(item.product.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-[1.25rem] bg-mist p-3">
        {appliedCoupon ? (
          <div className="flex items-center justify-between">
            <p className="text-sm font-extrabold text-moss">{appliedCoupon.code} applied</p>
            <button onClick={onClear} className="text-xs font-extrabold text-clay">Remove</button>
          </div>
        ) : (
          <div className="flex h-11 items-center gap-2 rounded-full bg-white px-3">
            <Tag size={17} className="text-clay" />
            <input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="WELCOME10" className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none" />
            <button onClick={onApply} className="text-sm font-extrabold text-ink">Apply</button>
          </div>
        )}
        {couponError ? <p className="mt-2 text-xs font-bold text-clay">{couponError}</p> : null}
      </div>
      <div className="mt-5 space-y-3 text-sm font-bold text-stone-600">
        <SummaryRow label="Subtotal" value={formatCurrency(totals.subtotal)} />
        <SummaryRow label="Coupon discount" value={`- ${formatCurrency(totals.couponDiscount)}`} highlight />
        <SummaryRow label="Delivery fee" value={totals.deliveryFee ? formatCurrency(totals.deliveryFee) : 'Free'} />
        <SummaryRow label="You save" value={formatCurrency(totals.totalSavings)} highlight />
      </div>
      <div className="mt-5 border-t border-stone-100 pt-4">
        <SummaryRow label="Total amount" value={formatCurrency(totals.total)} large />
      </div>
      <div className="mt-4 grid gap-2 rounded-[1.25rem] bg-cream p-3 text-sm font-bold text-stone-600">
        <span className="inline-flex items-center gap-2"><Truck size={16} className="text-moss" /> Estimated delivery: 2 to 5 days</span>
        <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-moss" /> Ships from Arborea fulfilment</span>
      </div>
    </>
  )
}

function SummaryRow({ label, value, highlight = false, large = false }) {
  return (
    <div className={`flex items-center justify-between ${large ? 'text-lg font-black text-ink' : ''}`}>
      <span>{label}</span>
      <span className={highlight ? 'text-moss' : 'text-ink'}>{value}</span>
    </div>
  )
}

function AddressSheet({ open, initial, onClose, onSave }) {
  const [form, setForm] = useState(initial ?? blankAddress)

  useEffect(() => setForm(initial ?? blankAddress), [initial, open])

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button className="fixed inset-0 z-[70] bg-black/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-label="Close address form" />
          <motion.section
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed inset-x-0 bottom-0 z-[80] max-h-[88dvh] overflow-y-auto rounded-t-[1.5rem] bg-pearl p-5 shadow-xl lg:left-1/2 lg:top-1/2 lg:w-[640px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-[2rem]"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-bold">{initial ? 'Edit address' : 'Add address'}</h2>
              <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm" aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ['fullName', 'Full Name'],
                ['phone', 'Phone Number'],
                ['pincode', 'Pincode'],
                ['state', 'State'],
                ['city', 'City'],
                ['landmark', 'Landmark'],
              ].map(([name, label]) => (
                <input key={name} name={name} value={form[name]} onChange={update} placeholder={label} className="h-12 rounded-2xl border border-stone-200 bg-white px-4 text-sm font-semibold outline-none focus:border-clay" />
              ))}
              <textarea name="address" value={form.address} onChange={update} placeholder="Address" className="min-h-24 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-clay sm:col-span-2" />
            </div>
            <button onClick={() => onSave(form)} className="mt-5 h-12 w-full rounded-full bg-moss px-5 text-sm font-extrabold text-white shadow-soft">
              Save Address
            </button>
          </motion.section>
        </>
      ) : null}
    </AnimatePresence>
  )
}
