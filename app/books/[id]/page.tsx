"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, MapPin, Mail, Phone, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

function Repeat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
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
    id: string;
    name: string;
    email: string;
    mobile: string;
  };
};

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [book, setBook] = useState<Book | null>(null);
  const [exchangeDialogOpen, setExchangeDialogOpen] = useState(false);

  const { id } = use(params);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/books/${id}`
        );
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error("Failed to fetch book:", err);
      }
    };

    fetchBook();
  }, [id]);

  const handleExchangeRequest = () => {
    console.log("Requesting exchange");
    setExchangeDialogOpen(false);
  };

  if (!book) return <div className="p-8 text-center">Loading...</div>;

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
              src={
                `${process.env.NEXT_PUBLIC_BASE_URL}${book.imageUrl}` ||
                "/placeholder.svg"
              }
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
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">{book.genre}</Badge>
            <Badge variant="secondary">{book.status}</Badge>
          </div>

          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">by {book.author}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Location: {book.location}</span>
            </div>
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
                  <span>{book.owner.mobile}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
