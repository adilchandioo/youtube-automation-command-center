import { useEffect, useState } from 'react'
import { Lock, TrendingUp, Users, DollarSign, Eye, AlertTriangle, RefreshCw, Youtube, LayoutDashboard } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts'
import sampleData from './data/sample-dashboard.json'

const PASSWORD = import.meta.env.VITE_DASHBOARD_PASSWORD || 'changeme'
const DATA_URL = import.meta.env.VITE_DATA_URL || '' // leave empty for sample data

function formatNum(n) {
  if (n == null) return '—'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return String(n)
}
function formatCurrency(n) {
  if (n == null) return '$0'
  return '$' + formatNum(n)
}
function timeAgo(iso) {
  if (!iso) return ''
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 60) return Math.floor(diff) + 's ago'
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago'
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago'
  return Math.floor(diff / 86400) + 'd ago'
}

function Kpi({ Icon, label, value, sub, color = 'text-white' }) {
  return (
    <div className="card flex-1 min-w-[44%]">
      <div className={`flex items-center gap-2 ${color} text-xs font-semibold uppercase tracking-wide opacity-70`}>
        <Icon size={14} /> {label}
      </div>
      <div className="text-2xl font-bold mt-1">{value}</div>
      {sub && <div className="text-xs text-white/50 mt-1">{sub}</div>}
    </div>
  )
}

function Spark({ data, color = '#10b981' }) {
  return (
    <div className="h-14 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <YAxis domain={['dataMin', 'dataMax']} hide />
          <Tooltip
            contentStyle={{ background: '#0f0f0f', border: '1px solid #333', borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: '#fff' }}
          />
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function ChannelCard({ ch }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-semibold flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: ch.brandColor || '#10b981' }} />
            {ch.name}
          </div>
          <div className="text-xs text-white/50">{ch.niche} · {ch.monetized ? 'Monetized' : 'Pre-YPP'}</div>
        </div>
        <a href={`https://youtube.com/channel/${ch.youtubeChannelId}`} target="_blank" rel="noreferrer"
           className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
          <Youtube size={18} className="text-yt-red" />
        </a>
      </div>

      <Spark data={ch.sparkViews || []} color={ch.brandColor || '#10b981'} />

      <div className="grid grid-cols-3 gap-2 mt-2 text-center">
        <div>
          <div className="text-[10px] uppercase text-white/50">Subs</div>
          <div className="font-bold text-sm">{formatNum(ch.subs)}</div>
          <div className={`text-[10px] ${ch.subsDelta >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {ch.subsDelta >= 0 ? '+' : ''}{formatNum(ch.subsDelta)}
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase text-white/50">24h Views</div>
          <div className="font-bold text-sm">{formatNum(ch.views24h)}</div>
          <div className="text-[10px] text-white/50">CTR {ch.ctr?.toFixed(1) || '—'}%</div>
        </div>
        <div>
          <div className="text-[10px] uppercase text-white/50">MRR</div>
          <div className="font-bold text-sm">{formatCurrency(ch.revenueMo)}</div>
          <div className="text-[10px] text-white/50">AVD {ch.avd?.toFixed(0) || '—'}%</div>
        </div>
      </div>

      {ch.lastVideo && (
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-3">
          <img src={ch.lastVideo.thumbnail} alt="" className="w-16 h-10 rounded object-cover bg-black" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate">{ch.lastVideo.title}</div>
            <div className="text-[10px] text-white/50">
              {formatNum(ch.lastVideo.views)} views · {timeAgo(ch.lastVideo.publishedAt)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AlertItem({ a }) {
  const colors = {
    viral: 'text-green-400 bg-green-400/10',
    strike: 'text-red-400 bg-red-400/10',
    warning: 'text-yellow-400 bg-yellow-400/10',
    info: 'text-blue-400 bg-blue-400/10',
  }
  const Icon = a.type === 'viral' ? TrendingUp : a.type === 'strike' ? AlertTriangle : AlertTriangle
  return (
    <div className={`flex gap-3 items-start p-3 rounded-lg ${colors[a.type] || colors.info}`}>
      <Icon size={18} className="mt-0.5 shrink-0" />
      <div className="text-sm">{a.message}</div>
    </div>
  )
}

export default function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('yacc_auth') === '1')
  const [pw, setPw] = useState('')
  const [data, setData] = useState(sampleData)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  useEffect(() => {
    if (!authed) return
    if (DATA_URL) {
      setLoading(true)
      fetch(DATA_URL)
        .then(r => r.json())
        .then(setData)
        .catch(e => console.error('data fetch failed, using sample', e))
        .finally(() => { setLoading(false); setLastRefresh(new Date()) })
    }
  }, [authed])

  function handleLogin(e) {
    e.preventDefault()
    if (pw === PASSWORD) {
      setAuthed(true)
      sessionStorage.setItem('yacc_auth', '1')
    } else {
      alert('Wrong password')
    }
  }

  function refresh() {
    setRefreshing(true)
    setTimeout(() => {
      setLastRefresh(new Date())
      setRefreshing(false)
    }, 700)
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="card w-full max-w-sm">
          <div className="flex items-center gap-2 mb-4">
            <LayoutDashboard size={22} className="text-yt-red" />
            <h1 className="text-lg font-bold">YACC Dashboard</h1>
          </div>
          <p className="text-sm text-white/60 mb-4">Enter password to view your YouTube command center.</p>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Password"
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yt-accent"
            autoFocus
          />
          <button className="w-full mt-3 bg-yt-red hover:bg-red-600 rounded-lg py-2 font-semibold flex items-center justify-center gap-2">
            <Lock size={16} /> Unlock
          </button>
          <p className="text-[10px] text-white/40 mt-3 text-center">
            Default password is "changeme" — set VITE_DASHBOARD_PASSWORD before deploy.
          </p>
        </form>
      </div>
    )
  }

  const totalSubs = data.channels.reduce((s, c) => s + (c.subs || 0), 0)
  const totalViews24 = data.channels.reduce((s, c) => s + (c.views24h || 0), 0)
  const totalMRR = data.channels.reduce((s, c) => s + (c.revenueMo || 0), 0)
  const totalVideos = data.channels.reduce((s, c) => s + (c.videosTotal || 0), 0)

  return (
    <div className="min-h-screen pb-8 max-w-2xl mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-yt-dark/90 backdrop-blur px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <Youtube size={22} className="text-yt-red" />
          <h1 className="font-bold">Command Center</h1>
        </div>
        <button onClick={refresh} className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
          <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
        </button>
      </header>

      <div className="px-4 pt-4">
        <div className="text-xs text-white/50 mb-1">Last updated {timeAgo(lastRefresh.toISOString())}</div>

        {/* Rollup KPIs */}
        <div className="flex flex-wrap gap-3 mb-4">
          <Kpi Icon={Users} label="Total Subs" value={formatNum(totalSubs)} sub={`${data.channels.length} channels`} />
          <Kpi Icon={Eye} label="24h Views" value={formatNum(totalViews24)} sub={`${totalVideos} videos live`} />
          <Kpi Icon={DollarSign} label="MRR" value={formatCurrency(totalMRR)} sub="ads + aff + spon" color="text-yt-accent" />
          <Kpi Icon={TrendingUp} label="Today" value={formatNum(totalViews24 / 24) + '/hr'} sub="avg views/hour" />
        </div>

        {/* Alerts */}
        {data.alerts && data.alerts.length > 0 && (
          <div className="mb-4 space-y-2">
            {data.alerts.map((a, i) => <AlertItem key={i} a={a} />)}
          </div>
        )}

        {/* Channels */}
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wide mb-2 mt-2">Channels</h2>
        <div className="space-y-3">
          {data.channels.map(ch => <ChannelCard key={ch.id} ch={ch} />)}
        </div>

        {/* Quick Links */}
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wide mb-2 mt-6">Quick Links</h2>
        <div className="grid grid-cols-2 gap-2">
          <a href="https://studio.youtube.com" target="_blank" rel="noreferrer"
             className="card hover:bg-white/10 flex items-center gap-2 text-sm">
            <Youtube size={18} className="text-yt-red" /> YouTube Studio
          </a>
          <a href="#" className="card hover:bg-white/10 flex items-center gap-2 text-sm">
            📋 Trello / Pipeline
          </a>
          <a href="#" className="card hover:bg-white/10 flex items-center gap-2 text-sm">
            💬 Discord Team
          </a>
          <a href="#" className="card hover:bg-white/10 flex items-center gap-2 text-sm">
            📊 Analytics Sheet
          </a>
        </div>

        <div className="text-center text-xs text-white/30 mt-6">
          YouTube Automation Command Center · v0.1 MVP
        </div>
      </div>
    </div>
  )
}
