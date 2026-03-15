// TODO: Replace with real events
const events = [
  {
    title: 'ネパールでイベント開催',
    date: '2026-03-20',
    location: 'ネパール',
    description: 'インドやネパールの子どもたちが抱く夢や姿をアートを通じて表現するイベント',
  },
  {
    title: '日本で夢の展覧会開催',
    date: '2026-05-01',
    location: '日本',
    description: 'インドやネパールの子どもたちの夢が詰まった作品などが見れる展示会',
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
      <h2 className="text-3xl font-semibold text-center mb-12">今後のスケジュール</h2>
      <div className="max-w-2xl mx-auto space-y-6">
        {events.map((event) => {
          const d = formatDate(event.date)
          const past = isPast(event.date)
          return (
            <div
              key={event.title}
              className={`flex gap-6 border border-gray-800 rounded-xl p-6 ${past ? 'opacity-50' : ''}`}>
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
