"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import BookCard from "./book-card";

const featuredBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    location: "New York",
    owner: "John Doe",
    status: "Available",
    coverUrl: "/placeholder.svg?height=280&width=200",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    location: "Chicago",
    owner: "Jane Smith",
    status: "Available",
    coverUrl: "/placeholder.svg?height=280&width=200",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    location: "San Francisco",
    owner: "Mike Johnson",
    status: "Available",
    coverUrl: "/placeholder.svg?height=280&width=200",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    location: "Boston",
    owner: "Sarah Williams",
    status: "Available",
    coverUrl: "/placeholder.svg?height=280&width=200",
  },
];

const FeaturedBooks = () => {
  const [activeGenre, setActiveGenre] = useState("All");
  const genres = ["All", "Classic", "Fiction", "Dystopian", "Romance"];

  const filteredBooks =
    activeGenre === "All"
      ? featuredBooks
      : featuredBooks.filter((book) => book.genre === activeGenre);

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Books</h2>
            <p className="text-muted-foreground">
              Discover books available in your community
            </p>
          </div>
          <Link href="/books">
            <Button variant="link" className="gap-2 mt-4 md:mt-0">
              View All Books <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={activeGenre === genre ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveGenre(genre)}
              className="rounded-full"
            >
              {genre}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
