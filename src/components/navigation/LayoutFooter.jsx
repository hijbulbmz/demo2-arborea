import { useLocation } from 'react-router-dom'
import { AppFooter } from './AppFooter'
import { shouldShowAppFooter } from '../../utils/footerVisibility'

export function LayoutFooter() {
  const { pathname } = useLocation()
  if (!shouldShowAppFooter(pathname)) return null
  return <AppFooter />
}
