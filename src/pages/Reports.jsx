import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  Package,
  Heart,
  BadgePercent,
  Flame,
  Sparkles,
  Layers,
  BarChart3,
  Users,
  DollarSign,
  ArrowUpRight
} from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { Card } from '../components/ui/Card'
import { formatCurrency } from '../utils/formatters'
import { SEO } from '../components/ui/SEO'

// Customer Skincare Mock Data
const monthlySpendingData = [
  { month: 'Jan', spent: 1800 },
  { month: 'Feb', spent: 2400 },
  { month: 'Mar', spent: 1200 },
  { month: 'Apr', spent: 3900 },
  { month: 'May', spent: 2950 },
  { month: 'Jun', spent: 4800 },
]

const categoryData = [
  { category: 'Serums & Oils', count: 4, spent: 4890, percent: 55, color: 'bg-clay text-clay' },
  { category: 'Sun Protection', count: 2, spent: 1980, percent: 23, color: 'bg-moss text-moss' },
  { category: 'Cleansers', count: 2, spent: 1100, percent: 12, color: 'bg-indigo-600 text-indigo-600' },
  { category: 'Moisturizers', count: 1, spent: 900, percent: 10, color: 'bg-amber-600 text-amber-600' },
]

const recentActivities = [
  { id: 1, type: 'purchase', text: 'Purchased "Sunscreen SPF 50" & "Vitamin C Serum"', time: '2 hours ago', icon: '🛍️' },
  { id: 2, type: 'coupon', text: 'Applied coupon code "GLOW15" for ₹210 savings', time: 'Yesterday', icon: '🏷️' },
  { id: 3, type: 'wishlist', text: 'Added "Nourishing Night Cream" to wishlist', time: '3 days ago', icon: '💖' },
  { id: 4, type: 'points', text: 'Rewarded 150 points for summer restock purchase', time: '4 days ago', icon: '✨' },
]

// Corporate D2C Brand Mock Data
const corporateRevenueData = [
  { month: 'Jan', spent: 340000 },
  { month: 'Feb', spent: 450000 },
  { month: 'Mar', spent: 620000 },
  { month: 'Apr', spent: 890000 },
  { month: 'May', spent: 1120000 },
  { month: 'Jun', spent: 1480000 },
]

const corporateProducts = [
  { name: "Vitamin C Brightening Serum", category: "Skincare", units: "4,240 sold", revenue: 3387760, color: "bg-clay" },
  { name: "Vanilla Amber Luxury Oud", category: "Perfumes", units: "3,180 sold", revenue: 4130820, color: "bg-moss" },
  { name: "Rosemary Bhringraj Hair Oil", category: "Haircare", units: "2,490 sold", revenue: 1491510, color: "bg-amber-600" },
  { name: "Satin Finish Sunscreen SPF 50", category: "Skincare", units: "2,110 sold", revenue: 1474890, color: "bg-emerald-600" }
]

const liveAdminFeed = [
  { id: 1, text: "New Order #ARB-9821 completed by Aarohi M. from Mumbai", time: "Just now", amount: 2847 },
  { id: 2, text: "Aaliyah K. redeemed reward balance points", time: "5 mins ago", amount: null },
  { id: 3, text: "Bestseller restock trigger fired for Neem Face Wash", time: "2 hours ago", amount: null },
  { id: 4, text: "Support Ticket #TKT-821 marked resolved by Concierge team", time: "4 hours ago", amount: null }
]

export function Reports() {
  const { user } = useAuthStore()
  const [dashboardMode, setDashboardMode] = useState('customer') // 'customer' | 'admin'
  const [activeChartPoint, setActiveChartPoint] = useState(null)

  // Chart setup
  const chartHeight = 160
  const chartWidth = 500

  const activeDataset = dashboardMode === 'customer' ? monthlySpendingData : corporateRevenueData
  const maxSpent = Math.max(...activeDataset.map((d) => d.spent))
  
  const points = activeDataset.map((d, index) => {
    const x = (index / (activeDataset.length - 1)) * (chartWidth - 40) + 20
    const y = chartHeight - (d.spent / maxSpent) * (chartHeight - 40) - 20
    return { x, y, ...d }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - 10} L ${points[0].x} ${chartHeight - 10} Z`

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="space-y-6 pb-20 select-none"
    >
      <SEO 
        title={dashboardMode === 'customer' ? "Regimen Insights" : "D2C Sales Portal"} 
        description="Luxury D2C metrics, interactive routine insights, and real-time revenue performance charts for the Arborea ecosystem."
      />

      {/* DASHBOARD MODE TOGGLE */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-stone-100 dark:border-stone-850 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">Corporate Portal</p>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl font-bold text-ink dark:text-white">
            {dashboardMode === 'customer' ? "Routine Insights" : "Executive D2C Hub"}
          </h1>
        </div>
        <div className="flex rounded-full bg-cream dark:bg-stone-850 p-1 shadow-inner border border-white/60 dark:border-stone-800">
          <button
            onClick={() => setDashboardMode('customer')}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition ${
              dashboardMode === 'customer' 
                ? 'bg-ink text-white shadow-soft' 
                : 'text-stone-500 hover:text-ink dark:hover:text-white'
            }`}
          >
            <Layers size={13} />
            My Regimen
          </button>
          <button
            onClick={() => setDashboardMode('admin')}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition ${
              dashboardMode === 'admin' 
                ? 'bg-ink text-white shadow-soft' 
                : 'text-stone-500 hover:text-ink dark:hover:text-white'
            }`}
          >
            <BarChart3 size={13} />
            D2C Corporate
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {dashboardMode === 'customer' ? (
          <motion.div
            key="customer-dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* CUSTOMER KPI GRID */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-5 relative overflow-hidden dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Invested</p>
                    <h3 className="mt-2 font-display text-3xl font-black text-ink dark:text-white">
                      {formatCurrency(8490)}
                    </h3>
                  </div>
                  <div className="rounded-xl bg-clay/10 p-2 text-clay">
                    <TrendingUp size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span>+12.4% vs last quarter</span>
                </div>
              </Card>

              <Card className="p-5 relative overflow-hidden dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Orders Placed</p>
                    <h3 className="mt-2 font-display text-3xl font-black text-ink dark:text-white">
                      6 Deliveries
                    </h3>
                  </div>
                  <div className="rounded-xl bg-moss/10 p-2 text-moss">
                    <Package size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-stone-500">
                  <span>Average ₹1,415 spent per order</span>
                </div>
              </Card>

              <Card className="p-5 relative overflow-hidden dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Discount Savings</p>
                    <h3 className="mt-2 font-display text-3xl font-black text-ink dark:text-white">
                      {formatCurrency(1250)}
                    </h3>
                  </div>
                  <div className="rounded-xl bg-amber-500/10 p-2 text-amber-600">
                    <BadgePercent size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-clay">
                  <span>Saved 14.7% with active coupons</span>
                </div>
              </Card>

              <Card className="p-5 relative overflow-hidden dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Wishlist Routine</p>
                    <h3 className="mt-2 font-display text-3xl font-black text-ink dark:text-white">
                      {user?.favorites?.length + 3} Products
                    </h3>
                  </div>
                  <div className="rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/20 p-2">
                    <Heart size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-stone-500">
                  <span>2 restock alerts active</span>
                </div>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* SPENDING CHARTS */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
                  <div className="flex items-center justify-between pb-4 border-b border-stone-50 dark:border-stone-800">
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink dark:text-white">Monthly Skincare Investment</h3>
                      <p className="text-xs text-stone-500 font-semibold mt-0.5">Six-month spending trend across skin health ranges.</p>
                    </div>
                    {activeChartPoint && (
                      <div className="rounded-xl bg-clay/10 px-3 py-1.5 text-right dark:bg-clay/20">
                        <p className="text-[10px] font-extrabold uppercase text-clay">Spent in {activeChartPoint.month}</p>
                        <p className="text-sm font-black text-ink dark:text-white">{formatCurrency(activeChartPoint.spent)}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 relative">
                    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
                      <defs>
                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8C6239" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#8C6239" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#8C6239" />
                          <stop offset="100%" stopColor="#4A5D4E" />
                        </linearGradient>
                      </defs>

                      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                        const yVal = chartHeight - ratio * (chartHeight - 40) - 20
                        return (
                          <line
                            key={ratio}
                            x1="10"
                            y1={yVal}
                            x2={chartWidth - 10}
                            y2={yVal}
                            stroke="rgba(120, 110, 100, 0.08)"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                          />
                        )
                      })}

                      <path d={areaPath} fill="url(#areaGrad)" />
                      <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" />

                      {points.map((p) => {
                        const isActive = activeChartPoint?.month === p.month
                        return (
                          <g key={p.month} className="cursor-pointer">
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r="14"
                              fill="transparent"
                              onMouseEnter={() => setActiveChartPoint(p)}
                              onMouseLeave={() => setActiveChartPoint(null)}
                            />
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r={isActive ? "6" : "4"}
                              fill={isActive ? "#8C6239" : "#ffffff"}
                              stroke="#8C6239"
                              strokeWidth={isActive ? "3" : "2"}
                              className="transition-all duration-250"
                            />
                          </g>
                        )
                      })}
                    </svg>

                    <div className="flex justify-between px-4 mt-2 text-[11px] font-bold text-stone-400 dark:text-stone-500">
                      {monthlySpendingData.map((d) => (
                        <span key={d.month}>{d.month}</span>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="p-6 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
                  <h3 className="font-display text-lg font-bold text-ink dark:text-white">Recent Activity Ledger</h3>
                  <p className="text-xs text-stone-500 font-semibold mt-0.5">Historical summary of store transactions and updates.</p>

                  <div className="mt-5 space-y-4">
                    {recentActivities.map((act) => (
                      <div key={act.id} className="flex items-start gap-3 border-b border-stone-50 pb-3 last:border-0 last:pb-0 dark:border-stone-800">
                        <div className="text-xl mt-0.5">{act.icon}</div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-ink dark:text-white leading-tight">{act.text}</p>
                          <p className="text-[11px] text-stone-400 mt-0.5">{act.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6 lg:col-span-1">
                <Card className="p-5 bg-moss/5 border-moss/10 dark:bg-stone-900/50 dark:border-stone-800" hover={false}>
                  <h3 className="font-display text-lg font-bold text-moss dark:text-stone-300 flex items-center gap-2">
                    <Flame size={19} className="text-moss animate-pulse" />
                    Beauty Ritual Streak
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">Consistency maps directly to glow metrics.</p>

                  <div className="mt-4 flex items-center gap-4 bg-white/70 p-4 rounded-2xl shadow-soft dark:bg-stone-900/50">
                    <div className="text-4xl">🔥</div>
                    <div>
                      <span className="text-2xl font-black text-ink dark:text-white">14 Days Solid</span>
                      <p className="text-xs text-stone-500 font-semibold">Dual hydration logging active.</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="flex gap-2.5 items-start">
                      <div className="rounded-lg bg-moss/10 p-1 text-moss mt-0.5">
                        <Sparkles size={14} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-ink dark:text-white">Formulation Insight</h4>
                        <p className="text-[11px] leading-5 text-stone-500 mt-0.5 font-bold">
                          Your focus on <strong>hydration</strong> maps perfectly with active Summer SPF layering.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
                  <h3 className="font-display text-lg font-bold text-ink dark:text-white">Category Portfolios</h3>
                  <p className="text-xs text-stone-500 font-semibold mt-0.5">Distribution of product purchases across botanical ranges.</p>

                  <div className="mt-6 space-y-4">
                    {categoryData.map((cat) => (
                      <div key={cat.category} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-stone-700 dark:text-stone-300">{cat.category}</span>
                          <span className="font-black text-ink dark:text-white">
                            {formatCurrency(cat.spent)} ({cat.percent}%)
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${cat.percent}%` }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={`h-full rounded-full ${cat.color.split(' ')[0]}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="admin-dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* CORPORATE KPI GRID */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-5 relative overflow-hidden border-amber-200/50 bg-amber-50/15 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Gross Sales (MTD)</p>
                    <h3 className="mt-2 font-display text-3xl font-black text-ink dark:text-white">
                      {formatCurrency(1480000)}
                    </h3>
                  </div>
                  <div className="rounded-xl bg-amber-600/10 p-2 text-amber-600">
                    <DollarSign size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight size={14} />
                  <span>+34.2% vs last month</span>
                </div>
              </Card>

              <Card className="p-5 relative overflow-hidden dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Customer Base</p>
                    <h3 className="mt-2 font-display text-3xl font-black text-ink dark:text-white">
                      12,480 Active
                    </h3>
                  </div>
                  <div className="rounded-xl bg-moss/10 p-2 text-moss">
                    <Users size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <ArrowUpRight size={14} />
                  <span>+18.6% new insiders this week</span>
                </div>
              </Card>

              <Card className="p-5 relative overflow-hidden dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">AOV (Avg Order Value)</p>
                    <h3 className="mt-2 font-display text-3xl font-black text-ink dark:text-white">
                      {formatCurrency(2450)}
                    </h3>
                  </div>
                  <div className="rounded-xl bg-clay/10 p-2 text-clay">
                    <TrendingUp size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-stone-500 font-semibold">
                  <span>Driven by Radiance Combos</span>
                </div>
              </Card>

              <Card className="p-5 relative overflow-hidden dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Gross Profit Margin</p>
                    <h3 className="mt-2 font-display text-3xl font-black text-ink dark:text-white">
                      72.4% Gross
                    </h3>
                  </div>
                  <div className="rounded-xl bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 p-2">
                    <BadgePercent size={20} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-stone-500 font-semibold">
                  <span>Premium organic pricing lock</span>
                </div>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* REVENUE GRAPH */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
                  <div className="flex items-center justify-between pb-4 border-b border-stone-50 dark:border-stone-800">
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink dark:text-white">D2C Sales Revenue Curve</h3>
                      <p className="text-xs text-stone-500 font-semibold mt-0.5">Corporate sales trajectory from Jan to Jun (INR).</p>
                    </div>
                    {activeChartPoint && (
                      <div className="rounded-xl bg-amber-600/10 px-3 py-1.5 text-right dark:bg-amber-950/30">
                        <p className="text-[10px] font-extrabold uppercase text-amber-600 dark:text-amber-400">Sales in {activeChartPoint.month}</p>
                        <p className="text-sm font-black text-ink dark:text-white">{formatCurrency(activeChartPoint.spent)}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 relative">
                    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
                      <defs>
                        <linearGradient id="adminAreaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#d97706" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#d97706" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="adminLineGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#d97706" />
                          <stop offset="100%" stopColor="#451a03" />
                        </linearGradient>
                      </defs>

                      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                        const yVal = chartHeight - ratio * (chartHeight - 40) - 20
                        return (
                          <line
                            key={ratio}
                            x1="10"
                            y1={yVal}
                            x2={chartWidth - 10}
                            y2={yVal}
                            stroke="rgba(120, 110, 100, 0.08)"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                          />
                        )
                      })}

                      <path d={areaPath} fill="url(#adminAreaGrad)" />
                      <path d={linePath} fill="none" stroke="url(#adminLineGrad)" strokeWidth="3" strokeLinecap="round" />

                      {points.map((p) => {
                        const isActive = activeChartPoint?.month === p.month
                        return (
                          <g key={p.month} className="cursor-pointer">
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r="14"
                              fill="transparent"
                              onMouseEnter={() => setActiveChartPoint(p)}
                              onMouseLeave={() => setActiveChartPoint(null)}
                            />
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r={isActive ? "6" : "4"}
                              fill={isActive ? "#d97706" : "#ffffff"}
                              stroke="#d97706"
                              strokeWidth={isActive ? "3" : "2"}
                              className="transition-all duration-250"
                            />
                          </g>
                        )
                      })}
                    </svg>

                    <div className="flex justify-between px-4 mt-2 text-[11px] font-bold text-stone-400 dark:text-stone-500">
                      {corporateRevenueData.map((d) => (
                        <span key={d.month}>{d.month}</span>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* LIVE D2C FEED */}
                <Card className="p-6 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
                  <h3 className="font-display text-lg font-bold text-ink dark:text-white">Live Operations Terminal</h3>
                  <p className="text-xs text-stone-500 font-semibold mt-0.5">Real-time mock events across fulfilment channels.</p>

                  <div className="mt-5 space-y-4">
                    {liveAdminFeed.map((feed) => (
                      <div key={feed.id} className="flex items-center justify-between border-b border-stone-50 pb-3 last:border-0 last:pb-0 dark:border-stone-800">
                        <div className="flex items-center gap-3">
                          <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500 animate-ping" />
                          <div>
                            <p className="text-sm font-bold text-ink dark:text-white leading-tight">{feed.text}</p>
                            <p className="text-[10px] text-stone-400 mt-0.5">{feed.time}</p>
                          </div>
                        </div>
                        {feed.amount && (
                          <span className="text-xs font-black text-[#d97706] bg-amber-500/10 px-2.5 py-1 rounded-full">
                            +{formatCurrency(feed.amount)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* PRODUCTS PERFORMANCE */}
              <div className="space-y-6 lg:col-span-1">
                <Card className="p-6 dark:border-stone-800 dark:bg-stone-900/60" hover={false}>
                  <h3 className="font-display text-lg font-bold text-ink dark:text-white">Best Selling Formulations</h3>
                  <p className="text-xs text-stone-500 font-semibold mt-0.5">Top revenue generators in D2C catalog.</p>

                  <div className="mt-6 space-y-4">
                    {corporateProducts.map((prod) => (
                      <div key={prod.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-stone-700 dark:text-stone-300 block max-w-[180px] truncate">{prod.name}</span>
                            <span className="text-[10px] text-stone-400 font-bold">{prod.units}</span>
                          </div>
                          <span className="font-black text-ink dark:text-white">
                            {formatCurrency(prod.revenue)}
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "65%" }}
                            transition={{ duration: 0.6 }}
                            className={`h-full rounded-full ${prod.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
