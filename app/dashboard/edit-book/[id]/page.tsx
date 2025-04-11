"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload, BookOpen } from "lucide-react";

const bookData = {
  id: 1,
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  genre: "Classic",
  description:
    "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
  condition: "Good",
  publisher: "Charles Scribner's Sons",
  publishedYear: "1925",
  pages: "180",
  status: "Available",
  coverUrl: "/placeholder.svg?height=400&width=300",
};

export default function EditBookPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    condition: "",
    publisher: "",
    publishedYear: "",
    pages: "",
    status: "Available",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Science Fiction",
    "Fantasy",
    "Romance",
    "Thriller",
    "Horror",
    "Biography",
    "History",
    "Self-Help",
    "Children's",
    "Young Adult",
    "Poetry",
    "Classic",
    "Other",
  ];

  const conditions = ["New", "Like New", "Very Good", "Good", "Fair", "Poor"];

  const statuses = ["Available", "Exchanged", "Pending"];

  // Simulate fetching book data
  useEffect(() => {
    // In a real app, you would fetch the book data from your API
    // const fetchBook = async () => {
    //   try {
    //     const response = await fetch(`/api/books/${params.id}`);
    //     if (!response.ok) throw new Error('Failed to fetch book');
    //     const data = await response.json();
    //     setFormData(data);
    //     setCoverImage(data.coverUrl);
    //   } catch (error) {
    //     console.error('Error fetching book:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // fetchBook();

    // Simulate API call with mock data
    setTimeout(() => {
      setFormData(bookData);
      setCoverImage(bookData.coverUrl);
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCoverImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }

    if (!formData.genre) {
      newErrors.genre = "Genre is required";
    }

    if (!formData.condition) {
      newErrors.condition = "Condition is required";
    }

    if (formData.publishedYear && !/^\d{4}$/.test(formData.publishedYear)) {
      newErrors.publishedYear = "Please enter a valid 4-digit year";
    }

    if (formData.pages && !/^\d+$/.test(formData.pages)) {
      newErrors.pages = "Please enter a valid number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - replace with your actual API endpoint
      // const response = await fetch(`/api/books/${params.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     coverImage,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to update book');
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to dashboard after successful submission
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating book:", error);
      setErrors((prev) => ({
        ...prev,
        form: "Failed to update book. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground animate-pulse mx-auto mb-4" />
            <p className="text-muted-foreground">Loading book details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-muted-foreground hover:text-accent mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Dashboard</span>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Book</CardTitle>
          <CardDescription>Update your book information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full aspect-[2/3] bg-muted rounded-md flex flex-col items-center justify-center overflow-hidden relative">
                    {coverImage ? (
                      <img
                        src={coverImage || "/placeholder.svg"}
                        alt="Book cover preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <BookOpen className="h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Upload book cover image
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <Label htmlFor="cover-image" className="mb-2 block">
                      Book Cover (Optional)
                    </Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="cover-image"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer bg-muted/50 hover:bg-muted/70 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG or WEBP (max. 2MB)
                          </p>
                        </div>
                        <Input
                          id="cover-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">
                      Book Title <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter book title"
                      value={formData.title}
                      onChange={handleChange}
                      className={errors.title ? "border-destructive" : ""}
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive">{errors.title}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="author">
                      Author <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="author"
                      name="author"
                      placeholder="Enter author name"
                      value={formData.author}
                      onChange={handleChange}
                      className={errors.author ? "border-destructive" : ""}
                    />
                    {errors.author && (
                      <p className="text-sm text-destructive">
                        {errors.author}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="genre">
                        Genre <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.genre}
                        onValueChange={(value) =>
                          handleSelectChange("genre", value)
                        }
                      >
                        <SelectTrigger
                          id="genre"
                          className={errors.genre ? "border-destructive" : ""}
                        >
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent>
                          {genres.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                              {genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.genre && (
                        <p className="text-sm text-destructive">
                          {errors.genre}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="condition">
                        Condition <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.condition}
                        onValueChange={(value) =>
                          handleSelectChange("condition", value)
                        }
                      >
                        <SelectTrigger
                          id="condition"
                          className={
                            errors.condition ? "border-destructive" : ""
                          }
                        >
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {conditions.map((condition) => (
                            <SelectItem key={condition} value={condition}>
                              {condition}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.condition && (
                        <p className="text-sm text-destructive">
                          {errors.condition}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="status">Book Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        handleSelectChange("status", value)
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Enter book description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="publisher">Publisher</Label>
                      <Input
                        id="publisher"
                        name="publisher"
                        placeholder="Publisher name"
                        value={formData.publisher}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="publishedYear">Published Year</Label>
                      <Input
                        id="publishedYear"
                        name="publishedYear"
                        placeholder="e.g. 2020"
                        value={formData.publishedYear}
                        onChange={handleChange}
                        className={
                          errors.publishedYear ? "border-destructive" : ""
                        }
                      />
                      {errors.publishedYear && (
                        <p className="text-sm text-destructive">
                          {errors.publishedYear}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="pages">Number of Pages</Label>
                      <Input
                        id="pages"
                        name="pages"
                        placeholder="e.g. 320"
                        value={formData.pages}
                        onChange={handleChange}
                        className={errors.pages ? "border-destructive" : ""}
                      />
                      {errors.pages && (
                        <p className="text-sm text-destructive">
                          {errors.pages}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {errors.form && (
              <p className="text-sm text-destructive text-center mt-4">
                {errors.form}
              </p>
            )}

            <div className="flex justify-end gap-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving Changes..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
