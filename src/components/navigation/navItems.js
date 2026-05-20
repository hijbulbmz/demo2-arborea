import {
  Bell,
  CircleHelp,
  ClipboardList,
  Heart,
  Home,
  Package,
  Settings,
  ShoppingBag,
  ShoppingCart,
  User,
} from 'lucide-react'

export const primaryNav = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Shop', path: '/shop', icon: ShoppingBag },
  { label: 'Wishlist', path: '/wishlist', icon: Heart },
  { label: 'Cart', path: '/cart', icon: ShoppingCart },
  { label: 'Profile', path: '/profile', icon: User },
]

export const drawerNav = [
  ...primaryNav,
  { label: 'Orders', path: '/orders', icon: Package },
  { label: 'Notifications', path: '/notifications', icon: Bell },
  { label: 'Account Preferences', path: '/settings', icon: Settings },
  { label: 'Support & Help', path: '/help', icon: CircleHelp },
  { label: 'FAQ', path: '/faq', icon: ClipboardList },
]
