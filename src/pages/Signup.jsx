import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthButton } from '../components/auth/AuthButton'
import { AuthCard } from '../components/auth/AuthCard'
import { AuthInput } from '../components/auth/AuthInput'
import { SocialButton } from '../components/auth/SocialButton'
import { useAuthStore } from '../store/useAuthStore'
import { useToastStore } from '../store/useToastStore'

export function Signup() {
  const navigate = useNavigate()
  const signup = useAuthStore((state) => state.signup)
  const showToast = useToastStore((state) => state.showToast)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: 'demo@brand.com',
    password: '',
    confirmPassword: '',
  })

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    window.setTimeout(() => {
      signup({ name: form.name, email: form.email })
      showToast('Signup successful')
      navigate('/', { replace: true })
    }, 650)
  }

  return (
    <AuthCard
      eyebrow="Create account"
      title="Start your ritual"
      subtitle="Create a local demo profile and unlock cart, orders, wishlist, and account preferences."
      footer={
        <p className="text-center text-sm text-stone-600">
          Already have an account?{' '}
          <Link to="/login" className="font-extrabold text-ink">
            Login
          </Link>
        </p>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <AuthInput label="Name" name="name" placeholder="Aarohi Mehta" value={form.name} onChange={update} />
        <AuthInput label="Email" name="email" type="email" value={form.email} onChange={update} />
        <AuthInput label="Password" name="password" type="password" value={form.password} onChange={update} />
        <AuthInput
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={update}
        />
        <AuthButton loading={loading} type="submit">
          Create account
        </AuthButton>
      </form>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <SocialButton icon="G" label="Google" />
        <SocialButton icon="A" label="Apple" />
      </div>
    </AuthCard>
  )
}
