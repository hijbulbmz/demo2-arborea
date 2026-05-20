import { DesktopLayout } from './DesktopLayout'
import { MobileLayout } from './MobileLayout'
import { CartDrawer } from '../components/commerce/CartDrawer'
import { FloatingCartButton } from '../components/commerce/FloatingCartButton'
import { QuickViewModal } from '../components/commerce/QuickViewModal'
import { SearchOverlay } from '../components/commerce/SearchOverlay'
import { ToastViewport } from '../components/ui/ToastViewport'

export function AppLayout() {
  return (
    <div className="relative z-10 min-h-screen">
      <MobileLayout />
      <DesktopLayout />
      <FloatingCartButton />
      <SearchOverlay />
      <QuickViewModal />
      <CartDrawer />
      <ToastViewport />
    </div>
  )
}
