import { createHashRouter } from 'react-router-dom'
import { AuthShell } from '../components/auth/AuthShell'
import { AppLayout } from '../layouts/AppLayout'
import { Cart } from '../pages/Cart'
import { Checkout } from '../pages/Checkout'
import { ForgotPassword } from '../pages/ForgotPassword'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Onboarding } from '../pages/Onboarding'
import { OrderSuccess } from '../pages/OrderSuccess'
import { OrderTracking } from '../pages/OrderTracking'
import { Orders } from '../pages/Orders'
import { PlaceholderPage } from '../pages/PlaceholderPage'
import { ProductDetails } from '../pages/ProductDetails'
import { Shop } from '../pages/Shop'
import { Signup } from '../pages/Signup'
import { Welcome } from '../pages/Welcome'
import { Wishlist } from '../pages/Wishlist'
import { ProtectedRoute } from './ProtectedRoute'

// Account and admin pages
import { Profile } from '../pages/Profile'
import { SettingsPage } from '../pages/Settings'
import { Reports } from '../pages/Reports'
import { Notifications } from '../pages/Notifications'
import { Help } from '../pages/Help'

export const router = createHashRouter([
  {
    element: <AuthShell />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'welcome', element: <Welcome /> },
      { path: 'onboarding', element: <Onboarding /> },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'product/:productId', element: <ProductDetails /> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: 'order-success/:orderId', element: <ProtectedRoute><OrderSuccess /></ProtectedRoute> },
      { path: 'track-order/:orderId', element: <ProtectedRoute><OrderTracking /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: 'orders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: 'admin/reports', element: <ProtectedRoute><Reports /></ProtectedRoute> },
      { path: 'settings', element: <ProtectedRoute><SettingsPage /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: 'notifications', element: <ProtectedRoute><Notifications /></ProtectedRoute> },
      { path: 'help', element: <Help /> },
      { path: 'faq', element: <PlaceholderPage title="FAQ" description="Shipping, returns, ingredients, and product usage answers will live here." /> },
    ],
  },
])
