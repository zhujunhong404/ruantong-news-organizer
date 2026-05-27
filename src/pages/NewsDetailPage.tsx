import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useNews } from '../hooks/useNews'
import NewsCard from '../components/NewsCard'

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { getNewsById, getRelatedNews } = useNews()
  const article = getNewsById(Number(id))
  const related = getRelatedNews(Number(id))

  if (!article) {
    return (
      <div className="detail-page">
        <div className="not-found">
          <h2>😕 新闻未找到</h2>
          <p>该新闻可能已被删除或ID无效</p>
          <Link to="/news" className="btn-primary">返回新闻列表</Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <article className="news-article">
        {/* 文章头部 */}
        <header className="article-header">
          <div className="article-meta-top">
            <span className={`cat-badge cat-${article.category}`}>{article.category}</span>
            <span className="article-date">📅 {article.date}</span>
            <span
              className={`imp-badge imp-${article.importance}`}
            >
              {article.importance === 'high' ? '🔴 重要' : article.importance === 'medium' ? '🟡 一般' : '⚪ 普通'}
            </span>
          </div>
          <h1 className="article-title">{article.title}</h1>
          <div className="article-source">
            📰 来源：{article.source} · 🔗{' '}
            <a href={article.url} target="_blank" rel="noopener noreferrer">查看原文</a>
          </div>
        </header>

        {/* AI 摘要 */}
        <section className="ai-summary-box">
          <div className="summary-label">🤖 AI 智能摘要</div>
          <p>{article.summary}</p>
        </section>

        {/* 正文 */}
        <section className="article-body">
          <p>{article.content}</p>
        </section>

        {/* 标签 */}
        <section className="article-tags">
          {article.tags.map(tag => (
            <span key={tag} className="tag-lg">#{tag}</span>
          ))}
        </section>
      </article>

      {/* 相关推荐 */}
      {related.length > 0 && (
        <section className="related-section">
          <h2>📎 相关新闻</h2>
          <div className="related-grid">
            {related.map(item => (
              <NewsCard key={item.id} article={item} />
            ))}
          </div>
        </section>
      )}

      <Link to="/news" className="back-link">← 返回新闻列表</Link>
    </motion.div>
  )
}
