"use client";

import type React from "react";

import { SelectItem } from "@/components/ui/select";

import { SelectContent } from "@/components/ui/select";

import { SelectValue } from "@/components/ui/select";

import { SelectTrigger } from "@/components/ui/select";

import { Select } from "@/components/ui/select";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  User,
  MapPin,
  Mail,
  Phone,
  Calendar,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";

const book = {
  id: 1,
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  genre: "Classic",
  description:
    "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
  location: "New York",
  owner: {
    name: "John Doe",
    email: "john@example.com",
    phone: "(123) 456-7890",
    joinedDate: "January 2023",
  },
  status: "Available",
  condition: "Good",
  coverUrl: "/placeholder.svg?height=400&width=300",
  publishedYear: 1925,
  publisher: "Charles Scribner's Sons",
  pages: 180,
};

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [exchangeDialogOpen, setExchangeDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    console.log("Sending message:", message);
    setMessage("");
    setContactDialogOpen(false);
  };

  const handleExchangeRequest = () => {
    console.log("Requesting exchange");
    setExchangeDialogOpen(false);
  };

  return (
    <div className="container py-8">
      <Link
        href="/books"
        className="flex items-center gap-2 text-muted-foreground hover:text-accent mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Books</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="relative aspect-[2/3] w-full max-w-[300px] mx-auto md:mx-0 bg-muted rounded-lg overflow-hidden shadow-lg">
            <Image
              src={book.coverUrl || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="mt-6 space-y-4">
            <Button
              className="w-full gap-2"
              onClick={() => setExchangeDialogOpen(true)}
            >
              <Repeat className="h-4 w-4" />
              Request Exchange
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => setContactDialogOpen(true)}
            >
              <MessageSquare className="h-4 w-4" />
              Contact Owner
            </Button>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">{book.genre}</Badge>
            <Badge variant="secondary">{book.status}</Badge>
            <Badge variant="outline">{book.condition} Condition</Badge>
          </div>

          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">by {book.author}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Published: {book.publishedYear}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{book.pages} pages</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>Publisher: {book.publisher}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Location: {book.location}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-muted-foreground">{book.description}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Book Owner</CardTitle>
              <CardDescription>
                Contact information for the book owner
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-accent" />
                  <span>{book.owner.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <span>{book.owner.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent" />
                  <span>{book.owner.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span>Member since {book.owner.joinedDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Book Owner</DialogTitle>
            <DialogDescription>
              Send a message to {book.owner.name} about "{book.title}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                placeholder="Hi, I'm interested in your book..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setContactDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSendMessage}>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Exchange Request Dialog */}
      <Dialog open={exchangeDialogOpen} onOpenChange={setExchangeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Book Exchange</DialogTitle>
            <DialogDescription>
              Request to exchange or rent "{book.title}" from {book.owner.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="exchange-type">Exchange Type</Label>
              <Select defaultValue="borrow">
                <SelectTrigger id="exchange-type">
                  <SelectValue placeholder="Select exchange type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="borrow">Borrow (Return Later)</SelectItem>
                  <SelectItem value="exchange">
                    Exchange with My Book
                  </SelectItem>
                  <SelectItem value="purchase">Purchase</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="exchange-message">Message (Optional)</Label>
              <Textarea
                id="exchange-message"
                placeholder="Add any details about your exchange request..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setExchangeDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleExchangeRequest}>Send Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Building icon component
function Building(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

// Repeat icon component
function Repeat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  );
}
