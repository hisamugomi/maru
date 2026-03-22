// TODO: Replace with real events
const events = [
  {
    title: '大学のパンフレットデザイン',
    date: '2026-03-20',
    location: '明治大学',
    description: 'オーキャンのパンフレットデザインの補助をした。',
  },
  {
    title: 'Having design in businesness as a form of strategy',
    date: '2026-05-01',
    location: '日本',
    description: 'Design is more than just aesthetics, design goes all the way from worker engagement and satisfaction.',
  },  
  {
    title: 'Design Conference 2026',
    date: '2026-06-03',
    location: '日本 東京ビッグサイト',
    description: '〇〇コンファレンスにて出店することが決定しました。○ブースにいますので、是非来てください！',
  },
]

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return {
    month: date.toLocaleDateString('ja-JP', { month: 'short' }),
    day: date.getDate(),
    year: date.getFullYear(),
  }
}

function isPast(dateStr) {
  return new Date(dateStr) < new Date()
}

export default function Features() {
  return (
    <section className="py-24 px-6">
      <h2 className="text-3xl font-semibold text-center mb-12">これまでの事例</h2>
      <div className="max-w-3xl mx-auto space-y-6">
        {events.map((event) => {
          const d = formatDate(event.date)
          const past = isPast(event.date)
          return (
            <div
              key={event.title}
              className={`flex gap-6 border border-gray-800 rounded-xl p-6 `}> {/*${past ? 'opacity-20' : ''}*/}
              {/* Date badge */}
              <div className="flex-shrink-0 text-center w-16">
                <p className="text-xs text-gray-400 uppercase">{d.month}</p>
                <p className="text-3xl font-bold">{d.day}</p>
                <p className="text-xs text-gray-400">{d.year}</p>
              </div>

              {/* Event details */}
              <div>
                <h3 className="text-lg font-medium mb-1">{event.title}</h3>
                <p className="text-xs text-gray-400 mb-2">{event.location}</p>
                <p className="text-gray-500 text-sm">{event.description}</p>
                {past && <span className="text-xs text-gray-500 mt-2 inline-block">終了</span>}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
