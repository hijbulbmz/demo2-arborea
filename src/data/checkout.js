export const addresses = [
  {
    id: 'addr_home',
    label: 'Home',
    fullName: 'Aarohi Mehta',
    phone: '9876543210',
    pincode: '400050',
    state: 'Maharashtra',
    city: 'Mumbai',
    address: '24 Jasmine House, Carter Road, Bandra West',
    landmark: 'Near sea link promenade',
    isDefault: true,
  },
  {
    id: 'addr_work',
    label: 'Work',
    fullName: 'Aarohi Mehta',
    phone: '9876501234',
    pincode: '400013',
    state: 'Maharashtra',
    city: 'Mumbai',
    address: '8th Floor, Botanical Labs, Lower Parel',
    landmark: 'Opposite High Street',
    isDefault: false,
  },
]

export const paymentMethods = [
  { id: 'upi', label: 'UPI', description: 'Pay with any UPI app' },
  { id: 'card', label: 'Credit/Debit Card', description: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', description: 'All major banks supported' },
  { id: 'cod', label: 'Cash on Delivery', description: 'Pay when your order arrives' },
  { id: 'wallet', label: 'Wallets', description: 'Paytm, PhonePe, Amazon Pay' },
]

export const coupons = {
  WELCOME10: { code: 'WELCOME10', type: 'percent', value: 10, label: '10% off first order' },
  ARBOREA20: { code: 'ARBOREA20', type: 'percent', value: 20, label: '20% off botanical rituals' },
  FREESHIP: { code: 'FREESHIP', type: 'shipping', value: 0, label: 'Free shipping' },
}

export const trackingSteps = [
  'Order Placed',
  'Confirmed',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
]
