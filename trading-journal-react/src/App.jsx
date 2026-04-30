import { useState, useEffect } from 'react'
import './App.css'

const NAV_ITEMS = [
  { id: 'quotes', label: 'Quotes', icon: '📈' },
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'tradelog', label: 'Trade Log', icon: '📋' },
  { id: 'gallery', label: 'Gallery', icon: '🖼️' },
  { id: 'calendar', label: 'Calendar', icon: '📅' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'checklist', label: 'Checklist', icon: '☑️' },
  { id: 'addtrade', label: 'Add Trade', icon: '➕' }
]

const SAMPLE_QUOTE_CARDS = [
  { text: 'Amateurs hope. Professionals work.', author: 'Jesse Livermore' },
  { text: 'Markets are never wrong – opinions often are.', author: "William O'Neil" },
  { text: 'Cut your losses. Let your profits run.', author: 'David Ricardo' },
  { text: 'Risk comes from not knowing what you\'re doing.', author: 'Warren Buffett' }
]

const SAMPLE_TRADES = [
  { date: 'Oct 24, 09:15', pair: 'XAUUSD', dir: 'BUY', session: 'NY Open', pnl: '+$420.00', grade: 'A', status: 'win' },
  { date: 'Oct 23, 14:30', pair: 'USDJPY', dir: 'SELL', session: 'London', pnl: '-$150.00', grade: 'C', status: 'loss' }
]

const SAMPLE_GALLERY = [
  { title: 'XAUUSD Breakout', date: 'Oct 24, 2023', label: 'PROFIT', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80' },
  { title: 'USDJPY Retest Fail', date: 'Oct 23, 2023', label: 'LOSS', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
  { title: 'EURUSD Scalp', date: 'Oct 21, 2023', label: 'PROFIT', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80' }
]

function formatCountdown(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${h}h ${m}m ${s}s`
}

function App() {
  const [currentPanel, setCurrentPanel] = useState('quotes')
  const [liveRate, setLiveRate] = useState(56.24)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [countdown, setCountdown] = useState(2 * 3600 + 45 * 60 + 12)

  const fetchRate = async () => {
    try {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
      const data = await res.json()
      if (data && data.rates && data.rates.PHP) {
        setLiveRate(parseFloat(data.rates.PHP.toFixed(2)))
      }
    } catch (error) {
      console.warn('Rate fetch failed:', error)
    }
  }

  useEffect(() => {
    const initializeApp = async () => {
      await fetchRate()
    }
    initializeApp()
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % SAMPLE_QUOTE_CARDS.length)
    }, 4 * 60 * 60 * 1000)

    return () => {
      clearInterval(timer)
      clearInterval(quoteTimer)
    }
  }, [])

  return (
    <div className="app-shell">
      <Sidebar currentPanel={currentPanel} onChange={setCurrentPanel} />
      <div className="page-shell">
        <Topbar liveRate={liveRate} />
        <main className="page-content">
          {currentPanel === 'quotes' && (
            <QuotesView quote={SAMPLE_QUOTE_CARDS[currentQuote]} quoteTimer={formatCountdown(countdown)} cards={SAMPLE_QUOTE_CARDS} />
          )}
          {currentPanel === 'overview' && <OverviewView />}
          {currentPanel === 'tradelog' && <TradeLogView trades={SAMPLE_TRADES} />}
          {currentPanel === 'gallery' && <GalleryView items={SAMPLE_GALLERY} />}
          {currentPanel === 'calendar' && <CalendarView />}
          {currentPanel === 'analytics' && <AnalyticsView />}
          {currentPanel === 'checklist' && <ChecklistView />}
          {currentPanel === 'addtrade' && <AddTradeView />}
        </main>
      </div>
    </div>
  )
}

function Sidebar({ currentPanel, onChange }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-brand">
        <div>After Hours&apos; Desk</div>
        <span>Journal</span>
      </div>
      <div className="sidebar-links">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar-link ${currentPanel === item.id ? 'active' : ''}`}
            onClick={() => onChange(item.id)}
          >
            <span className="link-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

function Topbar({ liveRate }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-title">Journal Dashboard</div>
        <div className="topbar-rate">
          <span className="rate-icon">💱</span>
          Live USD/PHP: {liveRate.toFixed(2)}
        </div>
      </div>
      <div className="topbar-actions">
        <span className="topbar-action">🔔</span>
        <span className="topbar-action">⚙️</span>
        <div className="topbar-avatar">TR</div>
      </div>
    </header>
  )
}

function QuotesView({ quote, quoteTimer, cards }) {
  return (
    <section className="view-section">
      <div className="quote-card glass-card">
        <div className="quote-decor">“</div>
        <h1>{quote.text}</h1>
        <p className="quote-author">— {quote.author}</p>
        <div className="quote-timer">Next rotation in: {quoteTimer}</div>
      </div>
      <div className="card-grid">
        {cards.map((item, index) => (
          <article key={index} className="mini-card">
            <p className="mini-text">“{item.text}”</p>
            <p className="mini-author">{item.author}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function OverviewView() {
  return (
    <section className="view-section">
      <div className="overview-grid">
        <div className="stat-card">
          <p className="stat-label">TOTAL TRADES</p>
          <h2>142</h2>
          <p className="stat-note">+12 this month</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">WIN RATE</p>
          <h2>64.2%</h2>
          <div className="progress-pill"><span>64.2%</span></div>
        </div>
        <div className="stat-card">
          <p className="stat-label">TOTAL P&L</p>
          <h2>+$4,281.50</h2>
          <p className="stat-note">≈ ₱240,791.56</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">BEST TRADE</p>
          <h2>+$890.00</h2>
          <p className="stat-note">XAUUSD | Buy</p>
        </div>
      </div>
      <div className="overview-charts">
        <div className="chart-card chart-large">
          <div className="chart-header">
            <h3>Cumulative P&L</h3>
            <span>Last 30 Days</span>
          </div>
          <div className="chart-spark">
            <div className="spark-col" style={{ height: '20%' }}></div>
            <div className="spark-col" style={{ height: '25%' }}></div>
            <div className="spark-col" style={{ height: '22%' }}></div>
            <div className="spark-col" style={{ height: '35%' }}></div>
            <div className="spark-col" style={{ height: '45%' }}></div>
            <div className="spark-col" style={{ height: '60%' }}></div>
            <div className="spark-col" style={{ height: '55%' }}></div>
            <div className="spark-col" style={{ height: '70%' }}></div>
            <div className="spark-col" style={{ height: '85%' }}></div>
            <div className="spark-col" style={{ height: '80%' }}></div>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-header">
            <h3>Win/Loss Ratio</h3>
          </div>
          <div className="donut-chart">
            <div className="donut-inner">
              <span>64%</span>
              <small>WIN RATE</small>
            </div>
          </div>
          <div className="donut-legend">
            <div><span className="legend-dot profit"></span>91 Wins</div>
            <div><span className="legend-dot loss"></span>51 Losses</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TradeLogView({ trades }) {
  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <h2>Trade Log</h2>
        </div>
        <div className="toggle-group">
          <button className="toggle-button active">Daily</button>
          <button className="toggle-button">Weekly</button>
          <button className="toggle-button">Monthly</button>
        </div>
      </div>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>Pair</th>
              <th>Dir</th>
              <th>Session</th>
              <th>P&L</th>
              <th>Execution</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.date + trade.pair}>
                <td>{trade.date}</td>
                <td className="pair-cell">{trade.pair}</td>
                <td>
                  <span className={`pill ${trade.status}`}>{trade.dir}</span>
                </td>
                <td>{trade.session}</td>
                <td className={trade.status === 'win' ? 'text-success' : 'text-failure'}>{trade.pnl}</td>
                <td>{trade.status === 'win' ? '✔️' : '❌'}</td>
                <td>{trade.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function GalleryView({ items }) {
  return (
    <section className="view-section">
      <h2>Trade Gallery</h2>
      <div className="gallery-meta">
        <h3>Week 42 - October</h3>
      </div>
      <div className="gallery-grid">
        {items.map((item) => (
          <article key={item.title} className="gallery-card">
            <img src={item.image} alt={item.title} />
            <div className={`gallery-tag ${item.label === 'LOSS' ? 'loss' : 'profit'}`}>{item.label}</div>
            <div className="gallery-body">
              <strong>{item.title}</strong>
              <small>{item.date}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function CalendarView() {
  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <h2>October 2023</h2>
        </div>
        <div className="button-row">
          <button className="icon-button">◀</button>
          <button className="icon-button">▶</button>
        </div>
      </div>
      <div className="calendar-card">
        <div className="calendar-row">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
            <div key={day} className="calendar-label">{day}</div>
          ))}
        </div>
        <div className="calendar-grid">
          <div className="calendar-day muted">28</div>
          <div className="calendar-day muted">29</div>
          <div className="calendar-day muted">30</div>
          <div className="calendar-day positive">
            <span>01</span>
            <strong>+$210</strong>
            <small>2 TRADES</small>
          </div>
          <div className="calendar-day"></div>
          <div className="calendar-day negative">
            <span>03</span>
            <strong>-$85</strong>
          </div>
          <div className="calendar-day"></div>
        </div>
      </div>
      <div className="detail-card">
        <h3>Details for October 1st</h3>
        <p>Select a day on the calendar to view trade specifics and session notes.</p>
      </div>
    </section>
  )
}

function AnalyticsView() {
  return (
    <section className="view-section">
      <h2>Performance Analytics</h2>
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>P&L by Session</h3>
          <div className="progress-row">
            <span>Asian Session</span>
            <strong>+$1,120</strong>
            <div className="progress-bar"><div style={{ width: '45%' }} /></div>
          </div>
          <div className="progress-row">
            <span>London Session</span>
            <strong>+$2,840</strong>
            <div className="progress-bar"><div style={{ width: '85%' }} /></div>
          </div>
          <div className="progress-row">
            <span>NY Session</span>
            <strong>-$450</strong>
            <div className="progress-bar fail"><div style={{ width: '20%' }} /></div>
          </div>
        </div>
        <div className="analytics-card">
          <h3>Trade Efficiency (PnL/Pair)</h3>
          <div className="pair-row"><span>XAUUSD</span><div className="pair-bar profit"><span>+$3,200</span></div></div>
          <div className="pair-row"><span>EURUSD</span><div className="pair-bar profit light"><span>+$940</span></div></div>
          <div className="pair-row"><span>USDJPY</span><div className="pair-bar loss"><span>-$1,250</span></div></div>
          <div className="pair-row"><span>GBPUSD</span><div className="pair-bar profit soft"><span>+$420</span></div></div>
        </div>
      </div>
    </section>
  )
}

function ChecklistView() {
  return (
    <section className="view-section checklist-view">
      <div className="checklist-card">
        <div className="checklist-hero">
          <h2>Pre-Session Protocol</h2>
          <div className="progress-pill"><span>50% Complete</span></div>
        </div>
        <div className="checklist-items">
          {[
            'Check Forex Factory for high-impact news (Red Folders)',
            'Identify Higher Timeframe (Daily/H4) trend & bias',
            'Mark Key Support/Resistance and Liquidity pools',
            'Review yesterday\'s trade mistakes & lessons',
            'Clear desk, turn off phone notifications'
          ].map((item) => (
            <label key={item} className="checklist-item">
              <input type="checkbox" defaultChecked={item.includes('Forex Factory') || item.includes('Higher Timeframe')} />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <textarea placeholder="Session intentions & mental state notes..." />
      </div>
    </section>
  )
}

function AddTradeView() {
  return (
    <section className="view-section">
      <h2>Journal New Trade</h2>
      <form className="add-trade-form">
        <div className="form-grid-3">
          <label>
            Asset Pair
            <select>
              <option>XAUUSD (Gold)</option>
              <option>EURUSD</option>
              <option>GBPUSD</option>
              <option>USDJPY</option>
              <option>BTCUSD</option>
            </select>
          </label>
          <label>
            Direction
            <div className="direction-buttons">
              <button type="button" className="direction active">BUY</button>
              <button type="button" className="direction">SELL</button>
            </div>
          </label>
          <label>
            Entry Date
            <input type="datetime-local" />
          </label>
        </div>
        <div className="form-grid-4">
          <label>
            Entry Price
            <input type="number" placeholder="0.0000" step="0.0001" />
          </label>
          <label>
            Exit Price
            <input type="number" placeholder="0.0000" step="0.0001" />
          </label>
          <label>
            Lot Size
            <input type="number" placeholder="0.10" step="0.01" />
          </label>
          <label>
            Result P&L ($)
            <input type="text" readOnly placeholder="Auto-calculated" />
          </label>
        </div>
        <div className="rubric-grid">
          {['A', 'B', 'C', 'D'].map((grade) => (
            <button key={grade} type="button" className="rubric-pill">
              <span>{grade}</span>
              <small>{grade === 'A' ? 'Flawless' : grade === 'B' ? 'Disciplined' : grade === 'C' ? 'Impulsive' : 'Mistake'}</small>
            </button>
          ))}
        </div>
        <div className="upload-card">
          <div className="upload-inner">
            <span>☁️</span>
            <p>Drag and drop MT4/TradingView screenshots here</p>
          </div>
        </div>
        <div className="form-actions">
          <button type="button" className="ghost-button">Cancel</button>
          <button type="submit" className="primary-button">Archive Trade</button>
        </div>
      </form>
    </section>
  )
}

export default App
