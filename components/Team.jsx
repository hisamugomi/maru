import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// TODO: Replace with real team data — add photo URLs and social links
const team = [
  {
    name: '稲田衣冴',
    role: 'Project lead',
    photo: 'https://api.dicebear.com/9.x/notionists/svg?seed=Erika',
    instagram: '#',
    linkedin: '#',
  },
  {
    name: '-',
    role: 'Organizer',
    photo: 'https://api.dicebear.com/9.x/notionists/svg?seed=Felix',
    instagram: '#',
    linkedin: '#',
  },
]

export default function Team() {
  return (
    <section className="py-10 px-6">
      <h2 className="text-3xl font-semibold text-center mb-12">Meet the Team</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {team.map((member) => (
          <div key={member.name} className="text-center">
            <Avatar className="w-28 h-28 mx-auto mb-4">
              <AvatarImage src={member.photo} alt={member.name} />
              <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h3 className="text-sm font-medium">{member.name}</h3>
            <p className="text-xs text-gray-400 mb-3">{member.role}</p>
            <div className="flex justify-center gap-3">
              <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-xs">
                IG
              </a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-xs">
                LI
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
