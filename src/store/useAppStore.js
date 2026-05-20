import { create } from 'zustand'
import { addresses, coupons, notifications, orders, products, users } from '../data'

const makeOrderId = () => `ARB-${Math.floor(10000 + Math.random() * 89999)}`

export const useAppStore = create((set) => ({
  user: users[0],
  products,
  wishlist: ['vitamin-c-face-wash-100ml'],
  cart: [
    {
      productId: 'neem-face-wash-100ml',
      quantity: 1,
    },
  ],
  notifications,
  addresses,
  selectedAddressId: addresses.find((address) => address.isDefault)?.id ?? addresses[0]?.id,
  paymentMethod: 'upi',
  appliedCoupon: null,
  couponError: '',
  orders,
  lastOrderId: orders[0]?.id ?? null,
  quickViewProductId: null,
  isSearchOpen: false,
  isCartDrawerOpen: false,
  recentSearches: ['Vitamin C', 'Neem', 'Aloe'],
  openQuickView: (productId) => set({ quickViewProductId: productId }),
  closeQuickView: () => set({ quickViewProductId: null }),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  addRecentSearch: (term) =>
    set((state) => ({
      recentSearches: [term, ...state.recentSearches.filter((item) => item !== term)].slice(0, 5),
    })),
  selectAddress: (id) => set({ selectedAddressId: id }),
  addAddress: (address) =>
    set((state) => {
      const id = address.id ?? `addr_${Date.now()}`
      return {
        addresses: [...state.addresses, { ...address, id, isDefault: state.addresses.length === 0 }],
        selectedAddressId: id,
      }
    }),
  updateAddress: (id, address) =>
    set((state) => ({
      addresses: state.addresses.map((item) => (item.id === id ? { ...item, ...address, id } : item)),
    })),
  deleteAddress: (id) =>
    set((state) => {
      const addresses = state.addresses.filter((item) => item.id !== id)
      return {
        addresses,
        selectedAddressId: state.selectedAddressId === id ? addresses[0]?.id : state.selectedAddressId,
      }
    }),
  selectPaymentMethod: (id) => set({ paymentMethod: id }),
  applyCoupon: (code) =>
    set(() => {
      const coupon = coupons[code.trim().toUpperCase()]
      return coupon ? { appliedCoupon: coupon, couponError: '' } : { couponError: 'Invalid coupon code' }
    }),
  clearCoupon: () => set({ appliedCoupon: null, couponError: '' }),
  toggleWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(productId)
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId],
    })),
  addToCart: (productId) =>
    set((state) => ({
      cart: state.cart.some((item) => item.productId === productId)
        ? state.cart.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...state.cart, { productId, quantity: 1 }],
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.productId !== productId),
    })),
  updateCartQuantity: (productId, quantity) =>
    set((state) => ({
      cart:
        quantity <= 0
          ? state.cart.filter((item) => item.productId !== productId)
          : state.cart.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    })),
  clearCart: () => set({ cart: [] }),
  placeOrder: ({ totals }) => {
    const orderId = makeOrderId()
    set((state) => {
      const selectedAddress = state.addresses.find((address) => address.id === state.selectedAddressId)
      const order = {
        id: orderId,
        status: 'Processing',
        paymentMethod: state.paymentMethod,
        total: totals.total,
        items: state.cart,
        placedAt: new Date().toISOString().slice(0, 10),
        deliveryEta: 'Expected in 2 to 5 days',
        address: selectedAddress ? `${selectedAddress.city}, ${selectedAddress.state}` : 'Selected address',
      }

      return {
        orders: [order, ...state.orders],
        lastOrderId: order.id,
        cart: [],
        appliedCoupon: null,
        couponError: '',
        isCartDrawerOpen: false,
      }
    })
    return orderId
  },
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((item) =>
        item.id === id ? { ...item, read: true } : item,
      ),
    })),
}))
