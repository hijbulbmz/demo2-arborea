import { DesktopLayout } from './DesktopLayout'
import { MobileLayout } from './MobileLayout'
import { BottomNav } from '../components/navigation/BottomNav'
import { CartDrawer } from '../components/commerce/CartDrawer'
import { QuickViewModal } from '../components/commerce/QuickViewModal'
import { SearchOverlay } from '../components/commerce/SearchOverlay'
import { ToastViewport } from '../components/ui/ToastViewport'

export function AppLayout() {
  return (
    <div className="relative z-10 min-h-screen">
      <MobileLayout />
      <DesktopLayout />
      <BottomNav />
      <SearchOverlay />
      <QuickViewModal />
      <CartDrawer />
      <ToastViewport />
    </div>
  )
}
