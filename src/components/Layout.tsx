import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/news', label: '新闻列表', icon: '📰' },
  { path: '/dashboard', label: '数据分析', icon: '📊' },
  { path: '/timeline', label: '时间线', icon: '📅' },
]

export default function Layout() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('darkMode', String(darkMode))
  }, [darkMode])

  return (
    <div className="app-layout">
      {/* 顶部导航 */}
      <header className="top-nav">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">📡</span>
            <span className="brand-text">软通新闻智能整理器</span>
          </Link>
        </div>

        <button
          className={`mobile-menu-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? '切换亮色模式' : '切换暗色模式'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </header>

      {/* 主内容区 */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className="app-footer">
        <p>© 2025 软通新闻智能整理器 | iSOFTStone News Organizer</p>
        <p className="footer-sub">数据来源：公开新闻报道 · AI智能整理分析</p>
      </footer>
    </div>
  )
}
