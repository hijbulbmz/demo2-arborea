import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthButton } from '../components/auth/AuthButton'
import { AuthCard } from '../components/auth/AuthCard'
import { AuthInput } from '../components/auth/AuthInput'
import { useToastStore } from '../store/useToastStore'

export function ForgotPassword() {
  const showToast = useToastStore((state) => state.showToast)
  const [email, setEmail] = useState('demo@brand.com')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      showToast('Reset link sent')
    }, 650)
  }

  return (
    <AuthCard
      eyebrow="Password help"
      title="Reset your access"
      subtitle="Demo-only password reset screen. No email is sent, but the interaction behaves like a polished app flow."
      footer={
        <p className="text-center text-sm text-stone-600">
          Remembered it?{' '}
          <Link to="/login" className="font-extrabold text-ink">
            Back to login
          </Link>
        </p>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <AuthInput label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <AuthButton loading={loading} type="submit">
          Send reset link
        </AuthButton>
      </form>
    </AuthCard>
  )
}
