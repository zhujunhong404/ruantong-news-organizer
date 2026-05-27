import { useNews } from '../hooks/useNews'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function TimelinePage() {
  const { allNews } = useNews()

  // 按日期分组
  const grouped = allNews.reduce<Record<string, typeof allNews>>((acc, item) => {
    if (!acc[item.date]) acc[item.date] = []
    acc[item.date].push(item)
    return acc
  }, {})

  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  return (
    <div className="timeline-page">
      <div className="page-header">
        <h1>📅 新闻时间线</h1>
        <p>按时间顺序浏览软通动力近30天的所有新闻动态</p>
      </div>

      <div className="timeline">
        {dates.map((date, dateIndex) => (
          <motion.div
            key={date}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: dateIndex * 0.05 }}
            className="timeline-group"
          >
            <div className="timeline-date-marker">
              <div className="timeline-dot" />
              <span className="timeline-date">{date}</span>
              <span className="timeline-count">{grouped[date].length} 篇</span>
            </div>
            <div className="timeline-items">
              {grouped[date].map(item => (
                <Link key={item.id} to={`/news/${item.id}`} className="timeline-item">
                  <span className={`tl-cat tl-cat-${item.category}`}>{item.category}</span>
                  <div className="tl-content">
                    <h4>{item.title}</h4>
                    <p>{item.summary.substring(0, 80)}...</p>
                  </div>
                  <span className={`tl-imp tl-imp-${item.importance}`}>
                    {item.importance === 'high' ? '🔴' : item.importance === 'medium' ? '🟡' : '⚪'}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
