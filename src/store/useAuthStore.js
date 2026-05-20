import { create } from 'zustand'

const premiumDefaultUser = {
  id: 'usr_7721',
  name: 'Aaliyah Sen',
  email: 'aaliyah.sen@arboreacare.com',
  phone: '+91 98765 43210',
  gender: 'Female',
  birthday: '1998-05-24',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  points: 1850,
  skinType: 'Combination Sensitive',
  hairType: 'Fine Wavy',
  interests: ['Anti-Aging', 'Hydration', 'Sun Protection', 'Skin Brightening'],
  favorites: ['Sunscreen SPF 50', 'Vitamin C Hydrating Serum'],
}

const defaultNotifications = [
  { id: 'notif-1', title: 'Order Dispatched 🚚', description: 'Your order ARB-76467 for Vitamin C Serum has been shipped via BlueDart.', time: '2 mins ago', type: 'order', read: false },
  { id: 'notif-2', title: 'Combo Offer Live', description: 'Save more on Aloe Vera and Lemon summer care combos this week.', time: '1 hour ago', type: 'offer', read: false },
  { id: 'notif-3', title: 'Wishlist Restock Alert 🛍️', description: 'The Silk Sunscreen SPF 50 is back in stock. Grab yours while it lasts!', time: 'Yesterday', type: 'wishlist', read: true },
  { id: 'notif-4', title: 'Evening Routine Checklist 🧖‍♀️', description: 'Time for your dual hydration ritual. Click to see customized tips.', time: '2 days ago', type: 'recommendation', read: true }
]

const defaultTickets = [
  {
    id: 'TCK-9821',
    subject: 'Order status check for ARB-76467',
    category: 'Delivery',
    status: 'In Progress',
    date: '2026-05-19',
    messages: [
      { sender: 'user', text: 'Hi, my order is showing dispatched but the tracking link is blank.', time: '10:30 AM' },
      { sender: 'support', text: 'Hello Aaliyah! We are currently updating our BlueDart integration. Your AWB is 479201948. It is out for delivery and should reach you by evening!', time: '11:15 AM' }
    ]
  },
  {
    id: 'TCK-8721',
    subject: 'Aloe Vera Gel formulation check',
    category: 'Product Info',
    status: 'Resolved',
    date: '2026-05-12',
    messages: [
      { sender: 'user', text: 'Is the Aloe Vera Gel completely fragrance-free? My skin flares up with essential oils.', time: '3:00 PM' },
      { sender: 'support', text: 'Yes, Aaliyah! Our Aloe Vera Gel is 100% fragrance-free, alcohol-free, and formulated specifically for hypersensitive skin.', time: '3:45 PM' }
    ]
  }
]

const readSavedState = () => {
  if (typeof window === 'undefined') return {}
  try {
    const saved = localStorage.getItem('arborea_premium_account')
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

const saveStateToStorage = (state) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('arborea_premium_account', JSON.stringify({
      user: state.user,
      theme: state.theme,
      language: state.language,
      currency: state.currency,
      notificationPrefs: state.notificationPrefs,
      devices: state.devices,
      notifications: state.notifications,
      supportTickets: state.supportTickets,
    }))
  } catch (e) {
    console.error('Failed to save premium state to localStorage', e)
  }
}

const saved = readSavedState()

export const useAuthStore = create((set, get) => ({
  user: saved.user ?? premiumDefaultUser,
  isAuthenticated: true, // Auto-authenticate default user for stunning first impressions
  theme: saved.theme ?? 'light',
  language: saved.language ?? 'en',
  currency: saved.currency ?? 'INR',
  notificationPrefs: saved.notificationPrefs ?? {
    orderUpdates: true,
    promotions: false,
    wishlistAlerts: true,
    skinTips: true
  },
  devices: saved.devices ?? [
    { id: 1, type: 'iPhone', name: 'iPhone 15 Pro Max', location: 'New Delhi, IN', active: true, date: 'Active Now' },
    { id: 2, type: 'Mac', name: 'MacBook Pro 16"', location: 'Mumbai, IN', active: false, date: 'Last active: 2 hours ago' }
  ],
  notifications: saved.notifications ?? defaultNotifications,
  supportTickets: saved.supportTickets ?? defaultTickets,

  // Authentication actions
  login: ({ email }) => {
    const user = { ...premiumDefaultUser, email: email || premiumDefaultUser.email }
    set({ user, isAuthenticated: true })
    saveStateToStorage(get())
    return user
  },
  signup: ({ name, email }) => {
    const user = { ...premiumDefaultUser, name: name || 'New Glow Member', email: email || premiumDefaultUser.email }
    set({ user, isAuthenticated: true })
    saveStateToStorage(get())
    return user
  },
  continueAsGuest: () => {
    set({ user: null, isAuthenticated: false })
  },
  logout: () => {
    set({ user: null, isAuthenticated: false })
  },

  // Premium Account Actions
  updateProfile: (updatedFields) => {
    set((state) => {
      const newUser = { ...state.user, ...updatedFields }
      const newState = { user: newUser }
      setTimeout(() => saveStateToStorage(get()), 0)
      return newState
    })
  },

  updatePreferences: (prefKey, items) => {
    set((state) => {
      const newUser = { ...state.user, [prefKey]: items }
      const newState = { user: newUser }
      setTimeout(() => saveStateToStorage(get()), 0)
      return newState
    })
  },

  toggleTheme: () => {
    set((state) => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light'
      
      // Update HTML body classes immediately
      if (typeof document !== 'undefined') {
        const root = document.documentElement
        if (nextTheme === 'dark') {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
      }
      
      const newState = { theme: nextTheme }
      setTimeout(() => saveStateToStorage(get()), 0)
      return newState
    })
  },

  setLanguage: (lang) => {
    set({ language: lang })
    saveStateToStorage(get())
  },

  setCurrency: (curr) => {
    set({ currency: curr })
    saveStateToStorage(get())
  },

  updateNotificationPrefs: (key, val) => {
    set((state) => {
      const nextPrefs = { ...state.notificationPrefs, [key]: val }
      const newState = { notificationPrefs: nextPrefs }
      setTimeout(() => saveStateToStorage(get()), 0)
      return newState
    })
  },

  terminateDevice: (id) => {
    set((state) => {
      const nextDevices = state.devices.filter((dev) => dev.id !== id)
      const newState = { devices: nextDevices }
      setTimeout(() => saveStateToStorage(get()), 0)
      return newState
    })
  },

  // Notification Actions
  markNotificationRead: (id) => {
    set((state) => {
      const nextNotifs = state.notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
      const newState = { notifications: nextNotifs }
      setTimeout(() => saveStateToStorage(get()), 0)
      return newState
    })
  },

  markAllNotificationsRead: () => {
    set((state) => {
      const nextNotifs = state.notifications.map((notif) => ({ ...notif, read: true }))
      const newState = { notifications: nextNotifs }
      setTimeout(() => saveStateToStorage(get()), 0)
      return newState
    })
  },

  deleteNotification: (id) => {
    set((state) => {
      const nextNotifs = state.notifications.filter((notif) => notif.id !== id)
      const newState = { notifications: nextNotifs }
      setTimeout(() => saveStateToStorage(get()), 0)
      return newState
    })
  },

  // Support Actions
  addSupportTicket: (subject, category, initialMessage) => {
    const newTicketId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`
    set((state) => {
      const newTicket = {
        id: newTicketId,
        subject,
        category,
        status: 'In Progress',
        date: new Date().toISOString().slice(0, 10),
        messages: [
          { sender: 'user', text: initialMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]
      }
      const nextTickets = [newTicket, ...state.supportTickets]
      setTimeout(() => saveStateToStorage(get()), 0)
      return { supportTickets: nextTickets }
    })
    return newTicketId
  },

  addTicketMessage: (ticketId, text) => {
    set((state) => {
      const nextTickets = state.supportTickets.map((tck) => {
        if (tck.id === ticketId) {
          const updatedMessages = [
            ...tck.messages,
            { sender: 'user', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          ]
          
          // Simulate mock automated instant premium assistant reply after 1s
          setTimeout(() => {
            set((innerState) => {
              const updatedTickets = innerState.supportTickets.map((innerTck) => {
                if (innerTck.id === ticketId) {
                  return {
                    ...innerTck,
                    messages: [
                      ...innerTck.messages,
                      {
                        sender: 'support',
                        text: `Thank you for your message, Aaliyah! A concierge agent has been assigned to ticket ${ticketId} and will review this details immediately.`,
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }
                    ]
                  }
                }
                return innerTck
              })
              saveStateToStorage({ ...innerState, supportTickets: updatedTickets })
              return { supportTickets: updatedTickets }
            })
          }, 1500)

          return { ...tck, messages: updatedMessages }
        }
        return tck
      })
      
      const newState = { supportTickets: nextTickets }
      setTimeout(() => saveStateToStorage(get()), 0)
      return newState
    })
  },

  // Reward points simulation
  addPoints: (pointsCount) => {
    set((state) => {
      const newPoints = state.user.points + pointsCount
      const newUser = { ...state.user, points: newPoints }
      const newState = { user: newUser }
      setTimeout(() => saveStateToStorage(get()), 0)
      return newState
    })
  }
}))
