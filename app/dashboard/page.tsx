"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Plus, Repeat } from "lucide-react";
import MyBooks from "@/components/dashboard/my-books";
import BookRequests from "@/components/dashboard/book-requests";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("my-books");

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <div className="flex-1 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your books and exchange requests
            </p>
          </div>
          <Link href="/dashboard/add-book">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Book
            </Button>
          </Link>
        </div>

        <Tabs
          defaultValue="my-books"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="my-books" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">My Books</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="gap-2">
              <Repeat className="h-4 w-4" />
              <span className="hidden sm:inline">Exchange Requests</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="my-books" className="space-y-4">
            <MyBooks />
          </TabsContent>
          <TabsContent value="requests" className="space-y-4">
            <BookRequests />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function MessageSquare(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
