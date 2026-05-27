import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts'
import { useNews } from '../hooks/useNews'

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#06B6D4', '#EF4444']

export default function DashboardPage() {
  const { categoryStats, topTags, trendData, allNews } = useNews()

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>📊 数据分析仪表盘</h1>
        <p>软通动力30天新闻数据的多维度智能分析</p>
      </div>

      {/* 统计卡片 */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📰</span>
          <div className="stat-info">
            <span className="stat-value">{allNews.length}</span>
            <span className="stat-desc">新闻总量</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📂</span>
          <div className="stat-info">
            <span className="stat-value">{categoryStats.length}</span>
            <span className="stat-desc">新闻分类</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🏷️</span>
          <div className="stat-info">
            <span className="stat-value">{topTags.length}</span>
            <span className="stat-desc">热门标签</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <div className="stat-info">
            <span className="stat-value">{allNews.filter(n => n.importance === 'high').length}</span>
            <span className="stat-desc">重要新闻</span>
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="charts-grid">
        {/* 分类饼图 */}
        <div className="chart-card">
          <h3>📈 分类分布</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryStats}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                label={({ name, value }) => `${name}(${value})`}
              >
                {categoryStats.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 时间趋势 */}
        <div className="chart-card">
          <h3>📅 发布时间趋势</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} name="新闻数量" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 分类柱状图 */}
        <div className="chart-card full-width">
          <h3>📊 各分类数量对比</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-20} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {categoryStats.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 标签云（用柱状图模拟） */}
        <div className="chart-card full-width">
          <h3>🏷️ 热门标签 TOP{topTags.length}</h3>
          <div className="tag-cloud">
            {topTags.map((tag, i) => (
              <span
                key={tag.name}
                className="cloud-tag"
                style={{
                  fontSize: `${Math.max(12, Math.min(28, 12 + tag.value * 2))}px`,
                  color: COLORS[i % COLORS.length],
                  opacity: 0.7 + (tag.value / topTags[0].value) * 0.3
                }}
              >
                #{tag.name} ({tag.value})
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
