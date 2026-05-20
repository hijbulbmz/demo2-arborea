export function getCartItems(cart, products) {
  return cart
    .map((item) => ({ ...item, product: products.find((product) => product.id === item.productId) }))
    .filter((item) => item.product)
}

export function getCheckoutTotals(items, coupon) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const productSavings = items.reduce(
    (sum, item) => sum + (item.product.compareAt - item.product.price) * item.quantity,
    0,
  )
  const baseDelivery = subtotal > 499 || subtotal === 0 ? 0 : 49
  const couponDiscount =
    coupon?.type === 'percent' ? Math.round((subtotal * coupon.value) / 100) : 0
  const deliveryFee = coupon?.type === 'shipping' ? 0 : baseDelivery
  const total = Math.max(0, subtotal - couponDiscount + deliveryFee)

  return {
    subtotal,
    productSavings,
    couponDiscount,
    deliveryFee,
    total,
    totalSavings: productSavings + couponDiscount + (baseDelivery - deliveryFee),
  }
}
