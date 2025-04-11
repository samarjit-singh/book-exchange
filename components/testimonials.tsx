import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "BookBuddy has completely changed how I discover new books. I've met amazing people in my neighborhood who share my taste in literature.",
    name: "Sarah Johnson",
    role: "Book Owner",
    avatar: "https://github.com/shadcn.png",
  },
  {
    quote:
      "As a college student, BookBuddy has saved me so much money on textbooks. The community is friendly and the process is seamless.",
    name: "Michael Chen",
    role: "Book Seeker",
    avatar: "https://github.com/shadcn.png",
  },
  {
    quote:
      "I've been able to clear my shelves of books I no longer read while helping others discover new stories. It's a win-win!",
    name: "Emily Rodriguez",
    role: "Book Owner",
    avatar: "https://github.com/shadcn.png",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of book lovers who are already sharing and
            discovering new books through BookBuddy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-muted/50">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-accent/40 mb-4" />
                <p className="mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
