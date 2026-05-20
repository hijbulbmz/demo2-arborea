import { useAppStore } from '../store/useAppStore'

export function useCartCount() {
  return useAppStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0),
  )
}
