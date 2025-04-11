"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, Filter, BookOpen } from "lucide-react";
import BookCard from "@/components/book-card";

type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  location: string;
  contact: string;
  status: string;
  imageUrl: string;
  owner: {
    name: string;
    email: string;
  };
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/books/all`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Failed to fetch books:", err));
  }, []);

  const genres = Array.from(new Set(books.map((book) => book.genre)));
  const locations = Array.from(new Set(books.map((book) => book.location)));

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      searchTerm === "" ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenre =
      selectedGenre === "" ||
      selectedGenre === "all" ||
      book.genre === selectedGenre;

    const matchesLocation =
      selectedLocation === "" ||
      selectedLocation === "all" ||
      book.location === selectedLocation;

    const matchesAvailability =
      !availableOnly || book.status.toLowerCase() === "available";

    return (
      matchesSearch && matchesGenre && matchesLocation && matchesAvailability
    );
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Browse Books</h1>
          <p className="text-muted-foreground">
            Discover books available for exchange in your community
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or author..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-4 bg-muted/50 rounded-lg">
          <div>
            <Label htmlFor="genre" className="mb-2 block">
              Genre
            </Label>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger id="genre">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location" className="mb-2 block">
              Location
            </Label>
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger id="location">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-end pt-6">
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm("");
                setSelectedGenre("");
                setSelectedLocation("");
                setAvailableOnly(false);
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No books found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
        </div>
      )}
    </div>
  );
}
