"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Plus, BookText, Repeat, User } from "lucide-react";
import MyBooks from "@/components/dashboard/my-books";
import BookRequests from "@/components/dashboard/book-requests";
import UserProfile from "@/components/dashboard/user-profile";

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">12</div>
                <BookText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Active Exchanges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">3</div>
                <Repeat className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">5</div>
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
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
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="my-books" className="space-y-4">
            <MyBooks />
          </TabsContent>
          <TabsContent value="requests" className="space-y-4">
            <BookRequests />
          </TabsContent>
          <TabsContent value="profile" className="space-y-4">
            <UserProfile />
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
