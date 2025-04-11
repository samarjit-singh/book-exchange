import { BookOpen, UserPlus, Search, Repeat } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Create an Account",
    description: "Sign up as a Book Owner or Book Seeker to get started.",
  },
  {
    icon: BookOpen,
    title: "List Your Books",
    description: "Add books you want to share, rent, or exchange with others.",
  },
  {
    icon: Search,
    title: "Browse Listings",
    description: "Find books you're interested in from people in your area.",
  },
  {
    icon: Repeat,
    title: "Exchange Books",
    description: "Connect with other members and arrange to exchange books.",
  },
]

const HowItWorks = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            BookBuddy makes it easy to share and discover books in your community. Follow these simple steps to get
            started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-background p-4 rounded-full mb-4 shadow-sm">
                <step.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
