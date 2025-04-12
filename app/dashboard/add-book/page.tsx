"use client";

import type React from "react";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload, BookOpen } from "lucide-react";

export default function AddBookPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    location: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sessionCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("service_session="));

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let imageUrl = "";

      if (coverImage) {
        const fileInput = document.getElementById(
          "cover-image"
        ) as HTMLInputElement;
        const file = fileInput?.files?.[0];

        if (file) {
          const imageForm = new FormData();
          imageForm.append("image", file);

          const uploadResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/books/image`,
            {
              method: "POST",
              body: imageForm,
            }
          );

          if (!uploadResponse.ok) {
            throw new Error("Image upload failed");
          }

          const uploadData = await uploadResponse.json();
          imageUrl = uploadData.imageUrl;
        }
      }

      if (sessionCookie) {
        const encoded = sessionCookie.split("=")[1];
        const user = JSON.parse(atob(encoded));

        const bookPayload = {
          ...formData,
          contact: user.email,
          ownerId: user.id,
          imageUrl,
        };

        const createResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/books/create`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookPayload),
          }
        );

        if (!createResponse.ok) {
          throw new Error("Failed to add book");
        }
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Error adding book:", error);
      setErrors((prev) => ({
        ...prev,
        form: "Failed to add book. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <CardTitle className="text-2xl">Add a New Book</CardTitle>
          <CardDescription>
            Share your book with the community for exchange or rental
          </CardDescription>
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
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                      />
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
                {isSubmitting ? "Adding Book..." : "Add Book"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
