"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  // Get user information directly from session
  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";

  // Prevent multiple submissions
  const submittingRef = useRef(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Fiction",
    image: "",
    description: "",
    totalCopies: 1,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalCopies" ? Number(value) : value,
    }));

    if (name === "image") {
      setImageFile(null);
      setImagePreview("");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setError("");
    setFormData((prev) => ({ ...prev, image: "" }));
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.image.trim();

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error("Cloudinary configuration is missing.");
    }

    const uploadData = new FormData();

    uploadData.append("file", imageFile);
    uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: uploadData,
      },
    );

    const result = await response.json();

    if (!response.ok || !result.secure_url) {
      throw new Error(result.error?.message || "Image upload failed.");
    }

    return result.secure_url as string;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Stop if another submission is already running
    if (submittingRef.current) return;

    submittingRef.current = true;

    setError("");
    setSuccess("");

    if (formData.totalCopies < 1 || !Number.isInteger(formData.totalCopies)) {
      setError("Total copies must be a positive whole number.");
      submittingRef.current = false;
      return;
    }

    if (!imageFile && !formData.image.trim()) {
      setError("Please upload a book image or provide an image URL.");
      submittingRef.current = false;
      return;
    }

    try {
      setLoading(true);

      const { data, error: tokenError } = await authClient.token();

      if (tokenError || !data?.token) {
        throw new Error("Please login first to add a book.");
      }

      // Upload selected image or use the provided URL
      const imageUrl = await uploadImage();

      const bookData = {
        ...formData,
        image: imageUrl,
      };

      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(bookData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add book.");
      }

      setSuccess("Book added successfully!");

      setFormData({
        title: "",
        author: "",
        category: "Fiction",
        image: "",
        description: "",
        totalCopies: 1,
      });

      setImageFile(null);
      setImagePreview("");

      setTimeout(() => {
        router.push("/books");
        router.refresh();
      }, 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[#E8E2D6] bg-transparent px-3 py-2 text-sm text-[#263D36] outline-none transition focus:border-[#D18B55] focus:ring-2 focus:ring-[#D18B55]/20 dark:border-[#34453D] dark:text-[#F5F0E6]";

  const labelClass =
    "mb-2 block text-sm font-medium text-[#263D36] dark:text-[#F5F0E6]";

  return (
    <main className="min-h-screen bg-[#F5F0E6] px-3 py-5 sm:px-4 sm:py-7 dark:bg-[#121B18]">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#D18B55]">
            BookNook Library
          </p>

          <h1 className="text-3xl font-bold text-[#263D36] dark:text-[#F5F0E6] sm:text-4xl">
            Add a New Book
          </h1>

          <p className="mt-3 text-sm text-[#66736B] dark:text-[#AAB7AE]">
            Share your favorite books with the BookNook community.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8E2D6] bg-white p-3 shadow-sm dark:border-[#34453D] dark:bg-[#1E2B26] sm:p-6">
          {error && (
            <div
              role="alert"
              className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300"
            >
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Book Title and Author */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              <div>
                <label htmlFor="title" className={labelClass}>
                  Book Title *
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="author" className={labelClass}>
                  Author Name *
                </label>

                <input
                  id="author"
                  name="author"
                  type="text"
                  required
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Category and Copies */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              <div>
                <label htmlFor="category" className={labelClass}>
                  Category *
                </label>

                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="totalCopies" className={labelClass}>
                  Total Copies *
                </label>

                <input
                  id="totalCopies"
                  name="totalCopies"
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={formData.totalCopies}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="imageFile" className={labelClass}>
                Book Image Upload
              </label>

              <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={inputClass}
              />

              <p className="mt-1 text-xs text-[#66736B] dark:text-[#AAB7AE]">
                Select an image from your device (maximum 5 MB).
              </p>

              {imagePreview && (
                <div className="mt-3">
                  <Image
                    src={imagePreview}
                    alt="Book cover preview"
                    width={112}
                    height={144}
                    unoptimized
                    className="h-36 w-28 rounded-lg border border-[#E8E2D6] object-contain dark:border-[#34453D]"
                  />
                </div>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className={labelClass}>
                Or Book Image URL
              </label>

              <input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/book-cover.jpg"
                className={inputClass}
              />

              <p className="mt-1 text-xs text-[#66736B] dark:text-[#AAB7AE]">
                Upload a file or provide an image URL. You do not need both.
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className={labelClass}>
                Short Description *
              </label>

              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description about the book..."
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* User Information */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              <div>
                <label htmlFor="userName" className={labelClass}>
                  User Name
                </label>

                <input
                  id="userName"
                  type="text"
                  value={userName}
                  readOnly
                  className={`${inputClass} bg-[#F5F0E6] dark:bg-[#263D36]`}
                />
              </div>

              <div>
                <label htmlFor="userEmail" className={labelClass}>
                  User Email
                </label>

                <input
                  id="userEmail"
                  type="email"
                  value={userEmail}
                  readOnly
                  className={`${inputClass} bg-[#F5F0E6] dark:bg-[#263D36]`}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || success !== ""}
              className="w-full rounded-lg bg-[#263D36] px-6 py-3 font-semibold text-white transition hover:bg-[#1B3029] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F]"
            >
              {loading
                ? "Adding Book..."
                : success
                  ? "Book Added!"
                  : "Add Book"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/books"
              className="text-sm font-medium text-[#66736B] transition hover:text-[#D18B55] dark:text-[#AAB7AE]"
            >
              ← Back to All Books
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
