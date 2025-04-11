import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import HowItWorks from "@/components/how-it-works";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <div>
      <section className="hero-pattern py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Share Books, <span className="text-accent">Connect</span>{" "}
                Communities
              </h1>
              <p className="text-lg text-muted-foreground">
                Join our community of book lovers to exchange, rent, and share
                books with people in your area. Give your books a new life and
                discover new stories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Join Now
                  </Button>
                </Link>
                <Link href="/books">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Browse Books
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block ml-96">
              <div className="absolute -top-6 -left-6 w-64 h-80 bg-book-page rounded-md shadow-lg transform rotate-6 z-10"></div>
              <div className="absolute -top-3 -left-3 w-64 h-80 bg-book-cream rounded-md shadow-lg transform rotate-3 z-20"></div>
              <div className="relative w-64 h-80 bg-accent rounded-md shadow-lg z-30 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />

      <Testimonials />

      <section className="py-16 bg-accent text-accent-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Book Community?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Sign up today and start sharing your favorite books with others in
            your community.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
