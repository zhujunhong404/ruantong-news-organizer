import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useNews } from '../hooks/useNews'

export default function HomePage() {
  const { allNews, categoryStats, topTags, trendData, getRelatedNews } = useNews()
  const latestNews = allNews.slice(0, 6)
  const highImportance = allNews.filter(n => n.importance === 'high').slice(0, 5)

  return (
    <div className="home-page">
      {/* Hero 区域 */}
      <section className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-content"
        >
          <h1 className="hero-title">
            <span className="hero-icon">📡</span>
            软通新闻智能整理器
          </h1>
          <p className="hero-subtitle">
            智能聚合软通动力近30天 <strong>{allNews.length}</strong> 篇新闻 · AI驱动的深度分析与可视化
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{allNews.length}</span>
              <span className="stat-label">新闻总量</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{categoryStats.length}</span>
              <span className="stat-label">覆盖分类</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{topTags.length}</span>
              <span className="stat-label">热门标签</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{highImportance.length}</span>
              <span className="stat-label">重要新闻</span>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/news" className="btn-primary">浏览全部新闻</Link>
            <Link to="/dashboard" className="btn-secondary">查看数据分析</Link>
          </div>
        </motion.div>
      </section>

      {/* 重要新闻 */}
      <section className="section">
        <div className="section-header">
          <h2>🔥 重点新闻</h2>
          <Link to="/news" className="view-all">查看全部 →</Link>
        </div>
        <div className="important-news-grid">
          {highImportance.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="important-news-card"
            >
              <span className="imp-date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="imp-tags">
                {item.tags.map(t => <span key={t} className="tag">#{t}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 最新动态 */}
      <section className="section">
        <div className="section-header">
          <h2>🕐 最新动态</h2>
          <Link to="/timeline" className="view-all">查看时间线 →</Link>
        </div>
        <div className="latest-list">
          {latestNews.map(item => (
            <Link key={item.id} to={`/news/${item.id}`} className="latest-item">
              <span className="latest-date">{item.date}</span>
              <div className="latest-info">
                <span className={`cat-badge cat-${item.category}`}>{item.category}</span>
                <span className="latest-title">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 分类概览 */}
      <section className="section">
        <div className="section-header">
          <h2>📊 分类概览</h2>
          <Link to="/dashboard" className="view-all">详细分析 →</Link>
        </div>
        <div className="category-overview">
          {categoryStats.map(cat => (
            <div key={cat.name} className="cat-card">
              <span className="cat-count">{cat.value}</span>
              <span className="cat-name">{cat.name}</span>
              <div className="cat-bar">
                <div
                  className="cat-bar-fill"
                  style={{ width: `${(cat.value / allNews.length) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
