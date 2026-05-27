import { useState, useEffect } from 'react'
import newsData from '../data/news.json'

export interface NewsItem {
  id: number
  title: string
  date: string
  source: string
  category: string
  tags: string[]
  summary: string
  content: string
  url: string
  importance: 'high' | 'medium' | 'low'
}

const CATEGORIES = ['全部', '技术合作', '财报', '产品', '人事', '行业奖项', '国际业务', '行业动态']

export function useNews() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [sortBy, setSortBy] = useState<'date' | 'importance'>('date')
  const [news, setNews] = useState<NewsItem[]>(newsData as NewsItem[])

  const filteredNews = news
    .filter(item => {
      const matchSearch = searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchCategory = selectedCategory === '全部' || item.category === selectedCategory
      return matchSearch && matchCategory
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      const importanceOrder = { high: 0, medium: 1, low: 2 }
      return importanceOrder[a.importance] - importanceOrder[b.importance]
    })

  // 统计数据
  const categoryStats = CATEGORIES.slice(1).map(cat => ({
    name: cat,
    value: news.filter(n => n.category === cat).length
  }))

  const tagStats: Record<string, number> = {}
  news.forEach(item => {
    item.tags.forEach(tag => {
      tagStats[tag] = (tagStats[tag] || 0) + 1
    })
  })
  const topTags = Object.entries(tagStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([name, value]) => ({ name, value }))

  const monthlyTrend: Record<string, number> = {}
  news.forEach(item => {
    const month = item.date.substring(0, 7)
    monthlyTrend[month] = (monthlyTrend[month] || 0) + 1
  })
  const trendData = Object.entries(monthlyTrend)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, count]) => ({ month, count }))

  return {
    news: filteredNews,
    allNews: news,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories: CATEGORIES,
    categoryStats,
    topTags,
    trendData,
    getNewsById: (id: number) => news.find(n => n.id === id),
    getRelatedNews: (id: number, limit = 4) => {
      const current = news.find(n => n.id === id)
      if (!current) return []
      return news
        .filter(n =>
          n.id !== id &&
          (n.category === current.category || n.tags.some(t => current.tags.includes(t)))
        )
        .slice(0, limit)
    }
  }
}
