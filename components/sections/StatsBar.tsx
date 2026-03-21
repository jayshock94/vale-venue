const stats = [
  { value: '100+', label: 'Events hosted', accent: false },
  { value: '5 Star', label: 'Average review', accent: false },
  { value: '100', label: 'Guest capacity', accent: false },
  { value: '$300', label: 'Starting price', accent: true },
]

export default function StatsBar() {
  return (
    <section className="bg-neutral-50 border-t border-b border-rule py-8 px-5 md:px-page">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center py-4 md:py-0 text-center ${
                index < stats.length - 1
                  ? 'md:border-r border-rule'
                  : ''
              } ${
                index % 2 === 0 && index < stats.length - 1
                  ? 'border-r border-rule md:border-r-0'
                  : ''
              } ${
                index < 2 ? 'border-b border-rule md:border-b-0' : ''
              }`}
            >
              <span className={`font-serif text-3xl ${stat.accent ? 'text-gold-600' : 'text-neutral-800'}`}>
                {stat.value}
              </span>
              <span className="font-sans text-xs text-neutral-500 uppercase tracking-stat mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
