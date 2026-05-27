import { useState } from 'react'
import NewsCard from './NewsCard'
import { useNews } from '../hooks/useNews'

export default function NewsList() {
  const { news, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, sortBy, setSortBy, categories } = useNews()
  const [visibleCount, setVisibleCount] = useState(9)

  return (
    <div className="news-list-container">
      {/* 搜索和筛选栏 */}
      <div className="filter-bar">
        <div className="search-box">
          🔍
          <input
            type="text"
            placeholder="搜索新闻标题、摘要或标签..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as 'date' | 'importance')}>
            <option value="date">按时间排序</option>
            <option value="importance">按重要性排序</option>
          </select>
        </div>
      </div>

      {/* 结果统计 */}
      <div className="result-count">
        共找到 <strong>{news.length}</strong> 篇新闻
      </div>

      {/* 新闻列表 */}
      <div className="news-grid">
        {news.slice(0, visibleCount).map((article, index) => (
          <NewsCard key={article.id} article={article} index={index} />
        ))}
      </div>

      {/* 加载更多 */}
      {visibleCount < news.length && (
        <button className="load-more-btn" onClick={() => setVisibleCount(c => c + 6)}>
          加载更多 ({news.length - visibleCount} 篇剩余)
        </button>
      )}

      {news.length === 0 && (
        <div className="empty-state">
          😕 没有找到匹配的新闻，试试其他关键词？
        </div>
      )}
    </div>
  )
}
