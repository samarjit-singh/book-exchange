import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface Book {
  id: number
  title: string
  author: string
  genre: string
  location: string
  owner: string
  status: string
  coverUrl: string
}

interface BookCardProps {
  book: Book
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card className="overflow-hidden book-card">
      <CardContent className="p-0">
        <div className="relative h-64 w-full bg-muted">
          <Image src={book.coverUrl || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
          <Badge variant="secondary" className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">
            {book.genre}
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
          <p className="text-muted-foreground text-sm mb-2">{book.author}</p>
          <div className="flex items-center text-xs text-muted-foreground gap-1 mb-1">
            <MapPin className="h-3 w-3" />
            <span>{book.location}</span>
          </div>
          <p className="text-xs text-muted-foreground">Owner: {book.owner}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/books/${book.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default BookCard
