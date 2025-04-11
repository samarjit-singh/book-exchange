"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X, MessageSquare, AlertCircle } from "lucide-react"

// Mock data for exchange requests
const incomingRequests = [
  {
    id: 1,
    book: {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverUrl: "/placeholder.svg?height=280&width=200",
    },
    requester: {
      id: 101,
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    type: "Borrow",
    message: "I'd love to borrow this book for my book club next month.",
    date: "2023-12-10",
    status: "Pending",
  },
  {
    id: 2,
    book: {
      id: 3,
      title: "1984",
      author: "George Orwell",
      coverUrl: "/placeholder.svg?height=280&width=200",
    },
    requester: {
      id: 102,
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    type: "Exchange",
    message: "I have 'Animal Farm' to exchange if you're interested.",
    date: "2023-12-08",
    status: "Pending",
  },
]

const outgoingRequests = [
  {
    id: 3,
    book: {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      coverUrl: "/placeholder.svg?height=280&width=200",
    },
    owner: {
      id: 103,
      name: "David Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    type: "Borrow",
    message: "I've been wanting to read this for ages!",
    date: "2023-12-05",
    status: "Accepted",
  },
  {
    id: 4,
    book: {
      id: 6,
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      coverUrl: "/placeholder.svg?height=280&width=200",
    },
    owner: {
      id: 104,
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    type: "Purchase",
    message: "I'd like to buy this book from you.",
    date: "2023-12-01",
    status: "Rejected",
  },
]

export default function BookRequests() {
  const [incoming, setIncoming] = useState(incomingRequests)
  const [outgoing, setOutgoing] = useState(outgoingRequests)

  const handleAccept = (requestId: number) => {
    setIncoming(incoming.map((request) => (request.id === requestId ? { ...request, status: "Accepted" } : request)))
  }

  const handleReject = (requestId: number) => {
    setIncoming(incoming.map((request) => (request.id === requestId ? { ...request, status: "Rejected" } : request)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "Accepted":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Accepted
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div>
      <Tabs defaultValue="incoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="incoming">Incoming Requests</TabsTrigger>
          <TabsTrigger value="outgoing">Outgoing Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="incoming">
          <h2 className="text-2xl font-bold mb-6">Incoming Exchange Requests</h2>

          {incoming.length > 0 ? (
            <div className="space-y-4">
              {incoming.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative h-32 w-24 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                        <Image
                          src={request.book.coverUrl || "/placeholder.svg"}
                          alt={request.book.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                          <div>
                            <h3 className="font-semibold text-lg">{request.book.title}</h3>
                            <p className="text-muted-foreground">{request.book.author}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{request.type}</Badge>
                            {getStatusBadge(request.status)}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={request.requester.avatar} alt={request.requester.name} />
                            <AvatarFallback>{request.requester.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">
                            Request from <span className="font-medium">{request.requester.name}</span> on{" "}
                            {new Date(request.date).toLocaleDateString()}
                          </span>
                        </div>

                        {request.message && (
                          <div className="bg-muted/50 p-3 rounded-md mb-4">
                            <p className="text-sm italic">"{request.message}"</p>
                          </div>
                        )}

                        {request.status === "Pending" && (
                          <div className="flex flex-col xs:flex-row gap-2">
                            <Button onClick={() => handleAccept(request.id)} className="gap-2" size="sm">
                              <Check className="h-4 w-4" />
                              Accept Request
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleReject(request.id)}
                              className="gap-2"
                              size="sm"
                            >
                              <X className="h-4 w-4" />
                              Decline
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Message
                            </Button>
                          </div>
                        )}

                        {request.status !== "Pending" && (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Message
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <AlertCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No incoming requests</h3>
              <p className="text-muted-foreground">You don't have any incoming exchange requests at the moment.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="outgoing">
          <h2 className="text-2xl font-bold mb-6">Outgoing Exchange Requests</h2>

          {outgoing.length > 0 ? (
            <div className="space-y-4">
              {outgoing.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative h-32 w-24 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                        <Image
                          src={request.book.coverUrl || "/placeholder.svg"}
                          alt={request.book.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                          <div>
                            <h3 className="font-semibold text-lg">{request.book.title}</h3>
                            <p className="text-muted-foreground">{request.book.author}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{request.type}</Badge>
                            {getStatusBadge(request.status)}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={request.owner.avatar} alt={request.owner.name} />
                            <AvatarFallback>{request.owner.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">
                            Request to <span className="font-medium">{request.owner.name}</span> on{" "}
                            {new Date(request.date).toLocaleDateString()}
                          </span>
                        </div>

                        {request.message && (
                          <div className="bg-muted/50 p-3 rounded-md mb-4">
                            <p className="text-sm italic">"{request.message}"</p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            variant={request.status === "Accepted" ? "default" : "outline"}
                            size="sm"
                            className="gap-2"
                            asChild
                          >
                            <Link href={`/books/${request.book.id}`}>
                              <Eye className="h-4 w-4" />
                              View Book
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Message Owner
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <AlertCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No outgoing requests</h3>
              <p className="text-muted-foreground">You haven't made any exchange requests yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Eye icon component
function Eye(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
