import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CircleHelp,
  MessageSquare,
  Phone,
  Mail,
  Send,
  PlusCircle,
  History,
  ChevronDown,
  X,
  User,
} from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useToastStore } from '../store/useToastStore'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

const faqData = [
  { q: 'Are Arborea products completely organic & vegan?', a: 'Yes! All Arborea formulations are 100% vegan, cruelty-free, and dermatologically tested. We harvest all active botanicals through sustainable organic cold-pressing methods.' },
  { q: 'How long does delivery take for standard orders?', a: 'Standard shipping takes 2 to 5 business days depending on your pin code. Express deliveries are dispatched within 6 hours and reach major metro hubs in 24-48 hours.' },
  { q: 'Can I request a full refund if a formulation flares my skin?', a: 'Absolutely. We offer a 15-day "Glow Guarantee". If a product causes a sensitive reaction, contact support to initiate a full, hassle-free refund.' },
  { q: 'Is cash on delivery (COD) supported in all regions?', a: 'COD is supported across 19,000+ pin codes. You will see delivery eligibility options during the checkout address selection.' },
]

export function Help() {
  const {
    supportTickets,
    addSupportTicket,
    addTicketMessage,
  } = useAuthStore()
  
  const showToast = useToastStore((state) => state.showToast)

  // States
  const [openFaq, setOpenFaq] = useState('')
  const [selectedTicketId, setSelectedTicketId] = useState(null)
  const [chatMessage, setChatMessage] = useState('')
  const [isCreatingTicket, setIsCreatingTicket] = useState(false)
  const [newTicket, setNewTicket] = useState({ subject: '', category: 'Delivery', message: '' })

  const handleCreateTicketSubmit = (e) => {
    e.preventDefault()
    if (!newTicket.subject.trim() || !newTicket.message.trim()) {
      showToast('Please fill all fields ❌')
      return
    }
    const id = addSupportTicket(newTicket.subject, newTicket.category, newTicket.message)
    showToast(`Support Ticket ${id} created! 🎫`)
    setIsCreatingTicket(false)
    setNewTicket({ subject: '', category: 'Delivery', message: '' })
    setSelectedTicketId(id) // Auto-open chat for the newly created ticket
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!chatMessage.trim()) return
    addTicketMessage(selectedTicketId, chatMessage)
    setChatMessage('')
    showToast('Message sent')
  }

  const activeTicket = supportTickets.find((tck) => tck.id === selectedTicketId)

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
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">Arborea Concierge</p>
          <h1 className="mt-1 font-display text-4xl font-bold text-ink dark:text-white lg:text-5xl">Help & Support</h1>
        </div>
        <Button
          onClick={() => setIsCreatingTicket(true)}
          variant="primary"
          size="sm"
          className="self-start h-10 text-xs"
        >
          <PlusCircle size={14} />
          Create Support Ticket
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT COLUMN: CONCIERGE CHANNELS & TICKET HISTORY */}
        <div className="space-y-6 lg:col-span-1">
          {/* HELP CHANNELS */}
          <Card className="p-5 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
            <h3 className="font-display text-lg font-bold text-ink dark:text-white">Direct Support Channels</h3>
            <div className="mt-4 space-y-2.5">
              {/* LIVE CHAT */}
              <button
                type="button"
                onClick={() => {
                  if (supportTickets.length > 0) {
                    setSelectedTicketId(supportTickets[0].id)
                    showToast('Connected to live assistant')
                  } else {
                    setIsCreatingTicket(true)
                  }
                }}
                className="flex w-full items-center gap-3.5 rounded-2xl border border-stone-100 bg-white p-3 text-left transition hover:border-clay hover:shadow-soft dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 p-2 shrink-0">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink dark:text-white">Interactive Live Assistant</p>
                  <p className="text-[11px] text-stone-500">Instant botanical support (Average reply: 1.5s)</p>
                </div>
              </button>

              {/* CALL CONCIERGE */}
              <a
                href="tel:+919876543210"
                onClick={() => showToast('Simulating call connection... 📞')}
                className="flex w-full items-center gap-3.5 rounded-2xl border border-stone-100 bg-white p-3 text-left transition hover:border-clay hover:shadow-soft dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 p-2 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink dark:text-white">Call Priority Desk</p>
                  <p className="text-[11px] text-stone-500">1800-ARBOREA-CARE (Toll-Free, 9AM-6PM)</p>
                </div>
              </a>

              {/* EMAIL */}
              <a
                href="mailto:concierge@arboreacare.com"
                onClick={() => showToast('Redirecting to mail client 📧')}
                className="flex w-full items-center gap-3.5 rounded-2xl border border-stone-100 bg-white p-3 text-left transition hover:border-clay hover:shadow-soft dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 p-2 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink dark:text-white">Email Botanical Hub</p>
                  <p className="text-[11px] text-stone-500">concierge@arboreacare.com (Replies in 4 hours)</p>
                </div>
              </a>
            </div>
          </Card>

          {/* TICKET REGISTRY LIST */}
          <Card className="p-5 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
            <div className="flex items-center gap-2">
              <History size={18} className="text-clay" />
              <h3 className="font-display text-lg font-bold text-ink dark:text-white">Ticket Registry</h3>
            </div>
            <p className="mt-1 text-xs text-stone-500">Select a ticket to review secure messaging logs.</p>

            <div className="mt-4 space-y-2.5">
              {supportTickets.length > 0 ? (
                supportTickets.map((tck) => {
                  const isActive = selectedTicketId === tck.id
                  const isResolved = tck.status === 'Resolved'
                  return (
                    <button
                      key={tck.id}
                      onClick={() => setSelectedTicketId(tck.id)}
                      className={`flex w-full flex-col rounded-2xl border p-3.5 text-left transition ${
                        isActive
                          ? 'border-clay bg-cream/30 dark:bg-stone-800/40'
                          : 'border-stone-100 bg-white hover:border-clay dark:border-stone-800 dark:bg-stone-900'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-black text-stone-700 dark:text-stone-300">{tck.id}</span>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-extrabold uppercase text-[9px] ${
                          isResolved
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                            : 'bg-clay/10 text-clay'
                        }`}>
                          {tck.status}
                        </span>
                      </div>
                      <p className="mt-2 text-xs font-bold text-ink dark:text-white leading-snug">
                        {tck.subject}
                      </p>
                      <p className="mt-1 text-[10px] text-stone-400">
                        Category: {tck.category} • Created: {tck.date}
                      </p>
                    </button>
                  )
                })
              ) : (
                <div className="py-8 text-center">
                  <p className="text-xs text-stone-500">No support tickets found.</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: FAQ ACCORDION OR ACTIVE CHAT BOX */}
        <div className="space-y-6 lg:col-span-2">
          {/* CHAT INTERACTIVE TERMINAL */}
          {activeTicket ? (
            <Card className="flex flex-col h-[520px] dark:border-stone-800 dark:bg-stone-900/60 overflow-hidden" hover={false}>
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-stone-100 bg-cream/10 p-4 dark:border-stone-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-clay/10 px-2 py-0.5 text-[9px] font-black text-clay">
                      {activeTicket.id}
                    </span>
                    <h3 className="font-display text-sm font-bold text-ink dark:text-white leading-snug pr-2 truncate max-w-[280px]">
                      {activeTicket.subject}
                    </h3>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-0.5">Concierge: Botanical Skin Specialist</p>
                </div>
                <button
                  onClick={() => setSelectedTicketId(null)}
                  className="rounded-lg p-1.5 text-stone-400 hover:bg-cream dark:hover:bg-stone-800"
                  aria-label="Close chat panel"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Chat Logs */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/40 dark:bg-stone-950/20">
                {activeTicket.messages.map((msg, index) => {
                  const isUser = msg.sender === 'user'
                  return (
                    <div
                      key={index}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2.5 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Avatar */}
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-xs font-black ${
                          isUser ? 'bg-clay text-white' : 'bg-moss text-white'
                        }`}>
                          {isUser ? <User size={13} /> : 'A'}
                        </div>
                        {/* Message body */}
                        <div>
                          <div className={`rounded-3xl px-4 py-2.5 text-xs font-bold leading-5 shadow-sm ${
                            isUser
                              ? 'bg-moss text-white dark:bg-clay dark:text-white rounded-tr-none'
                              : 'bg-white text-ink border border-stone-100 dark:bg-stone-900 dark:border-stone-850 dark:text-white rounded-tl-none'
                          }`}>
                            {msg.text}
                          </div>
                          <span className={`text-[9px] text-stone-400 mt-1 block ${isUser ? 'text-right' : 'text-left'}`}>
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Chat Input form */}
              {activeTicket.status !== 'Resolved' ? (
                <form onSubmit={handleSendMessage} className="border-t border-stone-100 p-3 bg-white dark:border-stone-850 dark:bg-stone-900 flex gap-2.5 items-center">
                  <input
                    type="text"
                    placeholder="Type message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1 h-11 border border-stone-200 bg-white rounded-full px-4 text-xs text-ink outline-none dark:border-stone-800 dark:bg-stone-900 dark:text-white focus:border-clay"
                  />
                  <button
                    type="submit"
                    className="grid h-11 w-11 place-items-center rounded-full bg-moss text-white hover:bg-[#29472d] dark:bg-clay"
                    aria-label="Send message"
                  >
                    <Send size={15} />
                  </button>
                </form>
              ) : (
                <div className="bg-emerald-50/35 border-t border-stone-150 p-4 text-center dark:bg-stone-900 dark:border-stone-800">
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    🎉 This ticket is marked as resolved. Create a new support ticket if you require further assistance.
                  </p>
                </div>
              )}
            </Card>
          ) : (
            /* DEFAULT FAQ DISPLAY */
            <Card className="p-6 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
              <h3 className="font-display text-xl font-bold text-ink dark:text-white flex items-center gap-2">
                <CircleHelp size={20} className="text-clay" />
                Frequently Asked Inquiries
              </h3>
              <p className="text-xs text-stone-500 mt-1">Review standard guides for shipping, ingredient formulations, and returns.</p>

              <div className="mt-6 space-y-2.5">
                {faqData.map((faq) => {
                  const isOpen = openFaq === faq.q
                  return (
                    <div key={faq.q} className="rounded-2xl border border-stone-100 bg-white shadow-soft dark:border-stone-800 dark:bg-stone-900">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? '' : faq.q)}
                        className="flex w-full items-center justify-between p-4 text-left font-bold text-sm text-ink dark:text-white"
                      >
                        {faq.q}
                        <ChevronDown className={`transition-transform duration-250 ${isOpen ? 'rotate-180 text-clay' : 'text-stone-400'}`} size={16} />
                      </button>
                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-xs leading-6 text-stone-500 border-t border-stone-50 pt-2.5 dark:border-stone-800">
                          {faq.a}
                        </p>
                      </motion.div>
                    </div>
                  )
                })}
              </div>
            </Card>
          )}

          {/* SIMULATE CREATE SUPPORT TICKET PANEL */}
          <AnimatePresence>
            {isCreatingTicket && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4 backdrop-blur-xs"
              >
                <motion.div
                  initial={{ scale: 0.95, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 15 }}
                  className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl dark:bg-stone-900"
                >
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
                    <h4 className="font-display text-lg font-bold text-ink dark:text-white">Create Support Ticket</h4>
                    <button
                      onClick={() => setIsCreatingTicket(false)}
                      className="rounded-lg p-1 text-stone-400 hover:bg-cream dark:hover:bg-stone-800"
                      aria-label="Close ticket panel"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleCreateTicketSubmit} className="mt-5 space-y-4">
                    <Input
                      label="Ticket Subject"
                      placeholder="e.g. Leaking body wash, delayed order ARB-789"
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                      required
                    />

                    <div>
                      <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">Category</span>
                      <select
                        value={newTicket.category}
                        onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                        className="h-11 w-full rounded-xl border border-stone-200 bg-white px-3 mt-1.5 text-xs text-ink outline-none dark:border-stone-850 dark:bg-stone-900 dark:text-white focus:border-clay"
                      >
                        <option value="Delivery">Delivery & Shipping</option>
                        <option value="Product Info">Formulations & Active Ingredients</option>
                        <option value="Payments">Payments & Refunds</option>
                        <option value="Returns">Returns & Exchanges</option>
                      </select>
                    </div>

                    <label className="block space-y-1.5">
                      <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">Detailed Message</span>
                      <textarea
                        rows={4}
                        placeholder="Provide details about your query..."
                        value={newTicket.message}
                        onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                        className="w-full rounded-2xl border border-stone-200 bg-white p-3.5 text-xs text-ink outline-none dark:border-stone-850 dark:bg-stone-900 dark:text-white focus:border-clay"
                        required
                      />
                    </label>

                    <Button type="submit" className="w-full" variant="primary">
                      Submit Concierge Request
                    </Button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
