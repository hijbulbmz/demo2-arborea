import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  Package,
  Heart,
  MapPin,
  Bell,
  CreditCard,
  CheckCircle,
  Camera,
} from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useToastStore } from '../store/useToastStore'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { RewardBalanceCard } from '../components/ui/RewardBalanceCard'

const skinTypesList = ['Dry', 'Oily', 'Combination Sensitive', 'Normal', 'Acne-Prone']
const hairTypesList = ['Fine Wavy', 'Thick Straight', 'Coily', 'Dry/Damaged', 'Color-Treated']

export function Profile() {
  const navigate = useNavigate()
  const { user, updateProfile, addPoints } = useAuthStore()
  const showToast = useToastStore((state) => state.showToast)
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || 'Female',
    birthday: user?.birthday || '',
  })

  // Quick Action Config
  const quickActions = [
    { label: 'My Orders', path: '/orders', icon: Package, color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' },
    { label: 'Wishlist', path: '/wishlist', icon: Heart, color: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400' },
    { label: 'Addresses', path: '/settings', icon: MapPin, color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' },
    { label: 'Notifications', path: '/notifications', icon: Bell, color: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400' },
    { label: 'Payments', path: '/settings', icon: CreditCard, color: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400' },
  ]

  const handleSaveProfile = (e) => {
    e.preventDefault()
    updateProfile(formData)
    setIsEditing(false)
    showToast('Profile updated successfully')
  }

  const handleAddPointsSimulate = () => {
    addPoints(50)
    showToast('Reward Balance updated: +₹50')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="space-y-6 pb-12"
    >
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">Your account</p>
          <h1 className="mt-1 font-display text-4xl font-bold text-ink dark:text-white lg:text-5xl">Your Account</h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT COLUMN: HERO USER CARD & QUICK ACTIONS */}
        <div className="space-y-6 lg:col-span-1">
          {/* USER CARD */}
          <Card className="overflow-hidden border border-stone-100 bg-white p-6 dark:border-stone-800 dark:bg-stone-900" hover={false}>
            <div className="flex flex-col items-center text-center">
              <div className="relative group cursor-pointer">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md dark:border-stone-800"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition group-hover:opacity-100">
                  <Camera className="text-white" size={22} />
                </div>
              </div>

              <h2 className="mt-4 font-display text-2xl font-semibold text-ink dark:text-white">{user?.name}</h2>
              <p className="text-sm text-stone-500">{user?.email}</p>
            </div>

            <div className="mt-6">
              <RewardBalanceCard balance={user?.points} onSimulate={handleAddPointsSimulate} />
            </div>
          </Card>

          {/* QUICK ACTIONS CARD */}
          <Card className="p-5 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
            <h3 className="font-display text-lg font-bold text-ink dark:text-white">Quick Actions</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.label}
                    onClick={() => navigate(action.path)}
                    className="flex flex-col items-center justify-center rounded-2xl border border-stone-100 bg-white p-4 transition hover:border-clay hover:shadow-soft dark:border-stone-800 dark:bg-stone-900 dark:hover:border-clay"
                  >
                    <div className={`rounded-xl p-2.5 ${action.color}`}>
                      <Icon size={20} />
                    </div>
                    <span className="mt-2 text-xs font-extrabold text-stone-700 dark:text-stone-300">{action.label}</span>
                  </button>
                )
              })}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: ACCOUNT FORMS & PREFERENCES */}
        <div className="space-y-6 lg:col-span-2">
          {/* PROFILE FORM CARDS */}
          <Card className="p-6 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
              <h3 className="font-display text-xl font-bold text-ink dark:text-white">Personal Information</h3>
              <Button
                variant="ghost"
                className="h-9 px-4 text-xs font-bold"
                onClick={() => {
                  if (isEditing) {
                    setFormData({
                      name: user?.name || '',
                      email: user?.email || '',
                      phone: user?.phone || '',
                      gender: user?.gender || 'Female',
                      birthday: user?.birthday || '',
                    })
                  }
                  setIsEditing(!isEditing)
                }}
              >
                {isEditing ? 'Cancel' : 'Edit Details'}
              </Button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Full Name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  required
                  className="disabled:bg-stone-50 dark:disabled:bg-stone-900/40"
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  required
                  className="disabled:bg-stone-50 dark:disabled:bg-stone-900/40"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Phone Number"
                  placeholder="Enter mobile"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="disabled:bg-stone-50 dark:disabled:bg-stone-900/40"
                />
                <Input
                  label="Birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                  disabled={!isEditing}
                  className="disabled:bg-stone-50 dark:disabled:bg-stone-900/40"
                />
              </div>

              <div>
                <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">Gender</span>
                <div className="mt-2 flex gap-3">
                  {['Male', 'Female', 'Rather not to say'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      disabled={!isEditing}
                      onClick={() => setFormData({ ...formData, gender: opt })}
                      className={`h-10 rounded-full px-5 text-xs font-bold transition ${
                        formData.gender === opt
                          ? 'bg-moss text-white dark:bg-clay dark:text-white'
                          : 'bg-cream/40 text-stone-600 border border-stone-200 hover:bg-cream dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700'
                      } disabled:opacity-75 disabled:cursor-not-allowed`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden pt-4"
                  >
                    <Button type="submit" className="w-full sm:w-auto" variant="primary">
                      <CheckCircle size={16} />
                      Save Changes
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Card>

          {/* BEAUTY PREFERENCES CARD */}
          <Card className="p-6 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
            <div className="border-b border-stone-100 pb-4 dark:border-stone-800">
              <h3 className="font-display text-xl font-bold text-ink dark:text-white">Skin & Hair Preferences</h3>
              <p className="mt-1 text-xs text-stone-500">
                Help Arborea suggest practical daily essentials for your routine.
              </p>
            </div>

            <div className="mt-6 space-y-6">
              {/* SKIN TYPE */}
              <div>
                <span className="text-sm font-bold text-stone-700 dark:text-stone-300">Skin Type</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {skinTypesList.map((type) => {
                    const isSelected = user?.skinType === type
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          updateProfile({ skinType: type })
                          showToast(`Skin set to ${type}`)
                        }}
                        className={`h-9 rounded-full px-4 text-xs font-bold transition ${
                          isSelected
                            ? 'bg-moss text-white shadow-sm'
                            : 'bg-white border border-stone-200 text-stone-600 hover:bg-cream/40 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-800'
                        }`}
                      >
                        {type}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* HAIR TYPE */}
              <div>
                <span className="text-sm font-bold text-stone-700 dark:text-stone-300">Hair Type</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {hairTypesList.map((type) => {
                    const isSelected = user?.hairType === type
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          updateProfile({ hairType: type })
                          showToast(`Hair set to ${type}`)
                        }}
                        className={`h-9 rounded-full px-4 text-xs font-bold transition ${
                          isSelected
                            ? 'bg-moss text-white shadow-sm'
                            : 'bg-white border border-stone-200 text-stone-600 hover:bg-cream/40 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-800'
                        }`}
                      >
                        {type}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
