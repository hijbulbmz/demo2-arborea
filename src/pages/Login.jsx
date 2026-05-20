import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { AuthButton } from '../components/auth/AuthButton'
import { AuthCard } from '../components/auth/AuthCard'
import { AuthInput } from '../components/auth/AuthInput'
import { SocialButton } from '../components/auth/SocialButton'
import { useAuthStore } from '../store/useAuthStore'
import { useToastStore } from '../store/useToastStore'

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((state) => state.login)
  const continueAsGuest = useAuthStore((state) => state.continueAsGuest)
  const showToast = useToastStore((state) => state.showToast)
  const [form, setForm] = useState({ email: 'demo@brand.com', password: '123456', remember: true })
  const [loading, setLoading] = useState(false)
  const from = location.state?.from || '/'

  const update = (event) => {
    const { name, value, checked, type } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    window.setTimeout(() => {
      login({ email: form.email, remember: form.remember })
      showToast('Login successful')
      navigate(from, { replace: true })
    }, 650)
  }

  const handleGuest = () => {
    continueAsGuest()
    showToast('Browsing as guest')
    navigate('/', { replace: true })
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <section className="hidden rounded-[2rem] bg-moss p-8 text-white shadow-soft lg:block">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose">Demo storefront</p>
        <h2 className="mt-4 font-display text-6xl font-bold leading-none">Your glow ritual, one tap away.</h2>
        <p className="mt-5 max-w-md text-base leading-7 text-white/70">
          A premium mobile-first sign-in flow built for a personal care ecommerce experience.
        </p>
        <div className="mt-10 rounded-[1.75rem] bg-white/10 p-5 backdrop-blur">
          <p className="text-sm font-bold text-rose">Demo credentials</p>
          <p className="mt-3 text-sm text-white/75">Email: demo@brand.com</p>
          <p className="mt-1 text-sm text-white/75">Password: 123456</p>
        </div>
      </section>

      <AuthCard
        eyebrow="Member login"
        title="Welcome back"
        subtitle="Use any email and password for this frontend-only demo. Your session is saved locally."
        footer={
          <p className="text-center text-sm text-stone-600">
            New to Arborea?{' '}
            <Link to="/signup" className="font-extrabold text-ink">
              Create account
            </Link>
          </p>
        }
      >
        <div className="mb-5 rounded-[1.5rem] bg-cream p-4 text-sm text-stone-700">
          <p className="font-extrabold text-ink">Demo credentials</p>
          <p className="mt-2">Email: demo@brand.com</p>
          <p>Password: 123456</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <AuthInput label="Email" name="email" type="email" value={form.email} onChange={update} />
          <AuthInput label="Password" name="password" type="password" value={form.password} onChange={update} />

          <div className="flex items-center justify-between gap-3 text-sm">
            <label className="flex items-center gap-2 font-semibold text-stone-600">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={update}
                className="h-4 w-4 rounded border-stone-300 accent-ink"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="font-extrabold text-clay">
              Forgot password?
            </Link>
          </div>

          <div className="sticky bottom-3 z-10 -mx-1 space-y-3 rounded-[1.75rem] bg-white/90 p-1 backdrop-blur md:static md:bg-transparent md:p-0">
            <AuthButton loading={loading} type="submit">
              Login
            </AuthButton>
            <AuthButton type="button" variant="secondary" onClick={handleGuest}>
              Continue as Guest
            </AuthButton>
          </div>
        </form>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <SocialButton icon="G" label="Google" />
          <SocialButton icon="A" label="Apple" />
        </div>
        <Link
          to="/welcome"
          className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-mist px-4 py-3 text-sm font-extrabold text-ink"
        >
          <ShoppingBag size={17} />
          View intro
        </Link>
      </AuthCard>
    </div>
  )
}
