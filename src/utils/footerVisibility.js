/** Routes where a site footer would crowd shopping or checkout UI */
const FOOTER_HIDDEN_EXACT = new Set([
  '/',
  '/shop',
  '/cart',
  '/checkout',
  '/wishlist',
  '/admin/reports',
])

const FOOTER_HIDDEN_PREFIXES = ['/product/', '/order-success/', '/track-order/']

export function shouldShowAppFooter(pathname) {
  if (FOOTER_HIDDEN_EXACT.has(pathname)) return false
  return !FOOTER_HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}
