import { AnimatedOutlet } from '../components/navigation/AnimatedOutlet'
import { MobileTopBar } from '../components/navigation/MobileTopBar'
import { SlideDrawer } from '../components/navigation/SlideDrawer'
import { useDisclosure } from '../hooks/useDisclosure'

export function MobileLayout() {
  const drawer = useDisclosure()

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream dark:bg-stone-950 transition-colors duration-300 lg:hidden">
      <MobileTopBar onMenu={drawer.open} />
      <main className="px-4 pb-[calc(6.25rem+env(safe-area-inset-bottom))] pt-4">
        <AnimatedOutlet />
      </main>
      <SlideDrawer open={drawer.isOpen} onClose={drawer.close} />
    </div>
  )
}
