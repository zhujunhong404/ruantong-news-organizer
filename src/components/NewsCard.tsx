import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { NewsItem } from '../hooks/useNews'

interface NewsCardProps {
  article: NewsItem
  index?: number
}

const categoryColors: Record<string, string> = {
  '技术合作': '#3B82F6',
  '财报': '#10B981',
  '产品': '#8B5CF6',
  '人事': '#F59E0B',
  '行业奖项': '#EC4899',
  '国际业务': '#06B6D4',
  '行业动态': '#6B7280',
}

const importanceBadge: Record<string, { label: string; color: string }> = {
  high: { label: '重要', color: '#EF4444' },
  medium: { label: '一般', color: '#F59E0B' },
  low: { label: '普通', color: '#6B7280' },
}

export default function NewsCard({ article, index = 0 }: NewsCardProps) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
      className="news-card"
      onClick={() => navigate(`/news/${article.id}`)}
    >
      <div className="card-header">
        <span
          className="category-tag"
          style={{ backgroundColor: `${categoryColors[article.category]}20`, color: categoryColors[article.category] }}
        >
          {article.category}
        </span>
        <div className="card-meta">
          <span className="card-date">📅 {article.date}</span>
          <span
            className="importance-badge"
            style={{ backgroundColor: importanceBadge[article.importance].color + '20', color: importanceBadge[article.importance].color }}
          >
            {importanceBadge[article.importance].label}
          </span>
        </div>
      </div>
      <h3 className="card-title">{article.title}</h3>
      <p className="card-summary">{article.summary}</p>
      <div className="card-footer">
        <div className="tag-list">
          {article.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
        <span className="source">📰 {article.source}</span>
      </div>
    </motion.div>
  )
}
