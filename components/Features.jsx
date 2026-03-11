// TODO: Replace these with your real offerings
const features = [
  {
    title: 'Design Workshops',
    description: 'Hands-on sessions to build design intuition.',
  },
  {
    title: 'Business Mentorship',
    description: 'Connect with professionals who think beyond pixels.',
  },
  {
    title: 'Collaborative Projects',
    description: 'Real briefs, real teams, real outcomes.',
  },
]

export default function Features() {
  return (
    <section className="py-24 px-6">
      <h2 className="text-3xl font-semibold text-center mb-12">What We Offer</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {features.map((f) => (
          <div key={f.title} className="border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
