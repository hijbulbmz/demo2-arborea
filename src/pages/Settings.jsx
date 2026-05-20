import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Globe, Lock, Moon, Shield, Smartphone, Sun } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useToastStore } from '../store/useToastStore'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'

export function SettingsPage() {
  const {
    theme,
    toggleTheme,
    language,
    setLanguage,
    currency,
    setCurrency,
    notificationPrefs,
    updateNotificationPrefs,
    devices,
    terminateDevice,
    logout,
  } = useAuthStore()

  const showToast = useToastStore((state) => state.showToast)
  const [passwordState, setPasswordState] = useState({ current: '', next: '', confirm: '' })
  const [marketingOptIn, setMarketingOptIn] = useState(true)

  const handlePasswordChangeSubmit = (event) => {
    event.preventDefault()
    if (passwordState.next !== passwordState.confirm) {
      showToast('New passwords do not match')
      return
    }
    showToast('Password updated')
    setPasswordState({ current: '', next: '', confirm: '' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="space-y-6 pb-12"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">Account Preferences</p>
        <h1 className="mt-1 font-display text-4xl font-extrabold text-ink dark:text-white lg:text-5xl">Settings</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6">
          <Card className="p-5 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-ink dark:text-white">
              <Globe size={18} className="text-moss" />
              Language
            </h3>
            <p className="mt-1 text-xs font-semibold text-stone-500">Choose the language and currency you prefer while shopping.</p>
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-brand bg-cream/70 p-3 dark:bg-stone-800/40">
                <div>
                  <p className="text-sm font-bold text-ink dark:text-white">Dark mode</p>
                  <p className="text-xs text-stone-500">Softer browsing at night</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${theme === 'dark' ? 'bg-moss' : 'bg-stone-200'}`}
                  aria-label="Toggle dark mode"
                >
                  <span className={`grid h-5 w-5 place-items-center rounded-full bg-white shadow transition ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}>
                    {theme === 'dark' ? <Moon size={11} className="text-moss" /> : <Sun size={11} className="text-amber-500" />}
                  </span>
                </button>
              </div>

              <label className="block">
                <span className="text-xs font-bold text-stone-600 dark:text-stone-300">Language</span>
                <select
                  value={language}
                  onChange={(event) => {
                    setLanguage(event.target.value)
                    showToast('Language preference updated')
                  }}
                  className="mt-1 h-11 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm text-ink outline-none focus:border-moss dark:border-stone-800 dark:bg-stone-900 dark:text-white"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-bold text-stone-600 dark:text-stone-300">Currency</span>
                <select
                  value={currency}
                  onChange={(event) => {
                    setCurrency(event.target.value)
                    showToast('Currency preference updated')
                  }}
                  className="mt-1 h-11 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm text-ink outline-none focus:border-moss dark:border-stone-800 dark:bg-stone-900 dark:text-white"
                >
                  <option value="INR">INR - Rupees</option>
                </select>
              </label>
            </div>
          </Card>

          <Card className="p-5 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
            <h3 className="text-lg font-extrabold text-ink dark:text-white">Orders & Support</h3>
            <p className="mt-1 text-xs font-semibold text-stone-500">Need a break from this account? You can sign out anytime.</p>
            <Button
              onClick={() => {
                logout()
                showToast('Signed out')
                window.location.hash = '#/'
              }}
              variant="secondary"
              className="mt-4 h-10 w-full text-xs"
            >
              Sign Out
            </Button>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-ink dark:text-white">
              <Bell size={19} className="text-moss" />
              Notifications
            </h3>
            <p className="mt-1 text-xs font-semibold text-stone-500">Control order updates, offers, and useful care reminders.</p>
            <div className="mt-6 space-y-4">
              {[
                { key: 'orderUpdates', label: 'Order & Shipping Updates', desc: 'Dispatch, delivery and COD status alerts.' },
                { key: 'promotions', label: 'Offers & Combo Deals', desc: 'Sale, festival, and budget combo messages.' },
                { key: 'wishlistAlerts', label: 'Wishlist Alerts', desc: 'Back-in-stock and low-stock updates.' },
                { key: 'skinTips', label: 'Care Tips', desc: 'Simple routine suggestions for your skin type.' },
              ].map((pref) => (
                <div key={pref.key} className="flex items-start justify-between gap-4 border-b border-stone-100 pb-4 last:border-0 last:pb-0 dark:border-stone-800">
                  <div>
                    <p className="text-sm font-bold text-ink dark:text-white">{pref.label}</p>
                    <p className="mt-0.5 text-xs text-stone-500">{pref.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      updateNotificationPrefs(pref.key, !notificationPrefs[pref.key])
                      showToast('Notification preference updated')
                    }}
                    className={`relative mt-1 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${notificationPrefs[pref.key] ? 'bg-moss' : 'bg-stone-200 dark:bg-stone-700'}`}
                    aria-label={`Toggle ${pref.label}`}
                  >
                    <span className={`inline-block h-4 w-4 rounded-full bg-white transition ${notificationPrefs[pref.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-ink dark:text-white">
              <Shield size={19} className="text-moss" />
              Privacy
            </h3>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <form onSubmit={handlePasswordChangeSubmit} className="space-y-3">
                <p className="text-sm font-bold text-ink dark:text-white">Change password</p>
                <Input label="Current Password" type="password" value={passwordState.current} onChange={(event) => setPasswordState({ ...passwordState, current: event.target.value })} required />
                <Input label="New Password" type="password" value={passwordState.next} onChange={(event) => setPasswordState({ ...passwordState, next: event.target.value })} required />
                <Input label="Confirm Password" type="password" value={passwordState.confirm} onChange={(event) => setPasswordState({ ...passwordState, confirm: event.target.value })} required />
                <Button type="submit" className="h-10 text-xs">
                  <Lock size={12} />
                  Update Password
                </Button>
              </form>

              <div>
                <p className="text-sm font-bold text-ink dark:text-white">Active devices</p>
                <div className="mt-3 space-y-3">
                  {devices.map((device) => (
                    <div key={device.id} className="flex items-center justify-between rounded-brand border border-stone-100 bg-white p-3 dark:border-stone-800 dark:bg-stone-900">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-cream text-moss dark:bg-stone-800">
                          <Smartphone size={18} />
                        </span>
                        <div>
                          <p className="text-sm font-bold text-ink dark:text-white">{device.name}</p>
                          <p className="text-[11px] text-stone-500">{device.location} | {device.date}</p>
                        </div>
                      </div>
                      {!device.active ? (
                        <button
                          type="button"
                          onClick={() => {
                            terminateDevice(device.id)
                            showToast('Device removed')
                          }}
                          className="text-xs font-bold text-clay"
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4 dark:border-stone-800">
                  <div>
                    <p className="text-sm font-bold text-ink dark:text-white">Marketing consent</p>
                    <p className="text-xs text-stone-500">Use browsing activity for relevant coupons.</p>
                  </div>
                  <button
                    onClick={() => {
                      setMarketingOptIn(!marketingOptIn)
                      showToast('Privacy preference updated')
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${marketingOptIn ? 'bg-moss' : 'bg-stone-200 dark:bg-stone-700'}`}
                    aria-label="Toggle marketing consent"
                  >
                    <span className={`inline-block h-4 w-4 rounded-full bg-white transition ${marketingOptIn ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
