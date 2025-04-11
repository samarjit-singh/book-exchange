import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  BookText,
  Users,
  Repeat,
  ArrowRight,
  MapPin,
} from "lucide-react";
import FeaturedBooks from "@/components/featured-books";
import HowItWorks from "@/components/how-it-works";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
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

      {/* Stats Section */}
      <section className="py-12 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-accent/10 p-4 rounded-full mb-4">
                <BookText className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-3xl font-bold">1,200+</h3>
              <p className="text-muted-foreground">Books Available</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-accent/10 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-muted-foreground">Active Members</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-accent/10 p-4 rounded-full mb-4">
                <Repeat className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-3xl font-bold">850+</h3>
              <p className="text-muted-foreground">Successful Exchanges</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-accent/10 p-4 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-3xl font-bold">25+</h3>
              <p className="text-muted-foreground">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <FeaturedBooks />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
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
