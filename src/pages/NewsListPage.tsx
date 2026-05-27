import NewsList from '../components/NewsList'

export default function NewsListPage() {
  return (
    <div className="news-list-page">
      <div className="page-header">
        <h1>📰 新闻列表</h1>
        <p>浏览软通动力近30天的全部新闻报道</p>
      </div>
      <NewsList />
    </div>
  )
}
