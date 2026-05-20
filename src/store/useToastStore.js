import { create } from 'zustand'

let toastId = 0

export const useToastStore = create((set) => ({
  toasts: [],
  showToast: (message, tone = 'success') => {
    const id = `toast-${toastId++}`
    set((state) => ({ toasts: [...state.toasts, { id, message, tone }] }))
    const timer = typeof window === 'undefined' ? globalThis : window
    timer.setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }))
    }, 2800)
  },
  dismissToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}))
