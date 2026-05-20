import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package,
  BadgePercent,
  Heart,
  Sparkles,
  Check,
  CheckCheck,
  Trash2,
  Inbox,
  Info,
} from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useToastStore } from '../store/useToastStore'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export function Notifications() {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
  } = useAuthStore()
  
  const showToast = useToastStore((state) => state.showToast)
  const [activeTab, setActiveTab] = useState('all')

  const tabs = [
    { id: 'all', label: 'All Alerts' },
    { id: 'order', label: 'Orders' },
    { id: 'offer', label: 'Offers' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'recommendation', label: 'Tips' },
  ]

  // Filter
  const filteredNotifs = notifications.filter((notif) => {
    if (activeTab === 'all') return true
    return notif.type === activeTab
  })

  const getNotifIcon = (type) => {
    switch (type) {
      case 'order':
        return { icon: Package, style: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' }
      case 'offer':
        return { icon: BadgePercent, style: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400' }
      case 'wishlist':
        return { icon: Heart, style: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400' }
      case 'recommendation':
      default:
        return { icon: Sparkles, style: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' }
    }
  }

  const handleMarkAllRead = () => {
    markAllNotificationsRead()
    showToast('All notifications marked as read! 🧹')
  }

  const handleDelete = (id, e) => {
    e.stopPropagation()
    deleteNotification(id)
    showToast('Alert cleared')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="space-y-6 pb-12"
    >
      {/* Title */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">Updates</p>
          <h1 className="mt-1 font-display text-4xl font-bold text-ink dark:text-white lg:text-5xl">Notifications</h1>
        </div>
        {notifications.some((n) => !n.read) && (
          <Button
            onClick={handleMarkAllRead}
            variant="secondary"
            size="sm"
            className="self-start h-10 text-xs font-bold"
          >
            <CheckCheck size={14} />
            Mark All Read
          </Button>
        )}
      </div>

      {/* TABS SELECTOR */}
      <div className="hide-scrollbar flex snap-x gap-2 overflow-x-auto border-b border-stone-100 pb-2 dark:border-stone-800">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const count = tab.id === 'all'
            ? notifications.length
            : notifications.filter((n) => n.type === tab.id).length
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative snap-center shrink-0 rounded-full px-4.5 py-2 text-xs font-bold transition ${
                isActive
                  ? 'bg-moss text-white dark:bg-clay dark:text-white'
                  : 'bg-white border border-stone-200 text-stone-500 hover:bg-cream dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300'
              }`}
            >
              {tab.label}
              {count > 0 && (
                <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-black ${
                  isActive ? 'bg-white text-ink dark:bg-white dark:text-clay' : 'bg-cream text-stone-600 dark:bg-stone-800 dark:text-stone-300'
                }`}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* NOTIFICATIONS CONTAINER */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredNotifs.length > 0 ? (
            filteredNotifs.map((notif) => {
              const { icon: Icon, style } = getNotifIcon(notif.type)
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, scale: 0.97, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, x: -60, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  onClick={() => {
                    if (!notif.read) {
                      markNotificationRead(notif.id)
                      showToast('Notification read')
                    }
                  }}
                  className={`group relative overflow-hidden rounded-[1.75rem] border border-white bg-white/70 p-4 shadow-soft transition-all hover:shadow-md cursor-pointer dark:border-stone-850 dark:bg-stone-900/60 ${
                    !notif.read ? 'border-l-4 border-l-clay ring-1 ring-clay/10 bg-white dark:border-l-clay' : ''
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Left Icon */}
                    <div className={`rounded-xl p-2.5 shrink-0 ${style}`}>
                      <Icon size={20} />
                    </div>

                    {/* Middle Text */}
                    <div className="flex-1 min-w-0 pr-8">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-ink dark:text-white leading-snug truncate pr-2">
                          {notif.title}
                        </p>
                        {!notif.read && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                        )}
                      </div>
                      <p className="text-xs text-stone-500 mt-1 leading-5">
                        {notif.description}
                      </p>
                      <span className="text-[10px] font-bold text-stone-400 mt-2 block">
                        {notif.time}
                      </span>
                    </div>

                    {/* Right action tray */}
                    <div className="absolute right-4 top-4 flex items-center gap-1">
                      {!notif.read && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            markNotificationRead(notif.id)
                            showToast('Marked as read')
                          }}
                          className="rounded-lg p-1.5 text-stone-400 hover:bg-cream dark:hover:bg-stone-800"
                          aria-label="Mark as read"
                        >
                          <Check size={15} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={(e) => handleDelete(notif.id, e)}
                        className="rounded-lg p-1.5 text-stone-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20"
                        aria-label="Delete alert"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="rounded-full bg-cream/40 p-4 text-stone-400 dark:bg-stone-800 dark:text-stone-600">
                <Inbox size={42} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink dark:text-white">Clean inbox</h3>
              <p className="mt-1.5 max-w-xs text-xs text-stone-500">
                No alerts found under this tag. We will update you when orders dispatch or restocks occur!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Notice */}
      <Card className="p-4 bg-indigo-50/25 border-indigo-100/50 dark:bg-stone-900/40 dark:border-stone-800" hover={false}>
        <div className="flex gap-2.5 items-start">
          <Info size={16} className="text-indigo-600 mt-0.5 shrink-0" />
          <p className="text-[11px] leading-5 text-indigo-800 dark:text-indigo-300">
            <strong>System note</strong>: You are viewing simulated notifications. You can toggle preference categories inside the settings tab to manage order alerts and early bird offer notifications.
          </p>
        </div>
      </Card>
    </motion.div>
  )
}
