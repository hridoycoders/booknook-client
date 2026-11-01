"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

interface EditBookProps {
  bookId: string;
}

export default function EditBook({ bookId }: EditBookProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [totalCopies, setTotalCopies] = useState("1");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch existing book
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${API_URL}/books/${bookId}`, {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load book");
        }

        setTitle(data.title);
        setAuthor(data.author);
        setCategory(data.category);
        setImage(data.image);
        setPreview(data.image);
        setDescription(data.description);
        setTotalCopies(String(data.totalCopies));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  // Select image
  const handleImageChange = (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB");
      return;
    }

    setError("");
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit updated book
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!session?.user) {
      setError("Please login first");
      return;
    }

    if (
      !title.trim() ||
      !author.trim() ||
      (!image.trim() && !selectedFile) ||
      !description.trim()
    ) {
      setError("Please fill in all required fields");
      return;
    }

    const copies = Number(totalCopies);

    if (!Number.isInteger(copies) || copies < 1) {
      setError("Total copies must be a positive whole number");
      return;
    }

    setSubmitting(true);

    try {
      let finalImage = image.trim();

      // Cloudinary image upload
      if (selectedFile) {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
          throw new Error("Cloudinary configuration is missing");
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", uploadPreset);

        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          },
        );

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadData.error?.message || "Image upload failed");
        }

        finalImage = uploadData.secure_url;
      }

      // Get authentication token
      const tokenResult = await authClient.token();
      const token = tokenResult.data?.token;

      if (tokenResult.error || !token) {
        throw new Error("Please login again");
      }

      // Update book
      const response = await fetch(`${API_URL}/books/${bookId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          author: author.trim(),
          category,
          image: finalImage,
          description: description.trim(),
          totalCopies: copies,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update book");
      }

      setSuccess("Book updated successfully!");

      setTimeout(() => {
        router.push("/my-books");
        router.refresh();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Shared styles
  const inputClass =
    "w-full min-w-0 rounded-lg border border-[#E8E2D6] bg-transparent px-2.5 py-2 text-xs text-[#263D36] outline-none transition placeholder:text-[#9AA39D] focus:border-[#D18B55] focus:ring-1 focus:ring-[#D18B55]/20 dark:border-[#34453D] dark:text-[#F5F0E6] dark:placeholder:text-[#84948A] sm:px-3 sm:py-2.5 sm:text-sm";

  const labelClass =
    "mb-1 block text-xs font-medium text-[#263D36] dark:text-[#F5F0E6] sm:mb-1.5 sm:text-sm";

  // Loading
  if (isPending || loading) {
    return (
      <div className="flex min-h-[45vh] items-center justify-center text-sm text-[#66736B] dark:text-[#AAB7AE]">
        Loading book information...
      </div>
    );
  }

  // Login required
  if (!session?.user) {
    return (
      <div className="flex min-h-[45vh] flex-col items-center justify-center gap-3 px-4 text-center">
        <h2 className="text-xl font-bold text-[#263D36] dark:text-[#F5F0E6]">
          Login Required
        </h2>

        <p className="text-sm text-[#66736B] dark:text-[#AAB7AE]">
          Please login to edit your book.
        </p>

        <Link
          href="/login"
          className="rounded-lg bg-[#263D36] px-5 py-2.5 text-sm font-medium text-white"
        >
          Login
        </Link>
      </div>
    );
  }

  // Error state
  if (error && !title && !loading) {
    return (
      <div className="flex min-h-[45vh] flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-sm text-red-500">{error}</p>

        <Link
          href="/my-books"
          className="text-sm font-medium text-[#D18B55] underline"
        >
          Back to My Books
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F5F0E6] px-3 py-6 dark:bg-[#121B18] sm:px-5 sm:py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <Link
            href="/my-books"
            className="text-xs font-medium text-[#66736B] transition hover:text-[#D18B55] dark:text-[#AAB7AE]"
          >
            ← Back to My Books
          </Link>

          <h1 className="mt-2 text-xl font-bold text-[#263D36] dark:text-[#F5F0E6] sm:mt-3 sm:text-3xl">
            Edit Book
          </h1>

          <p className="mt-1 text-xs text-[#66736B] dark:text-[#AAB7AE] sm:text-sm">
            Update your book information.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-3 rounded-xl border border-[#E8E2D6] bg-white p-3 shadow-sm dark:border-[#34453D] dark:bg-[#1E2B26] sm:space-y-5 sm:p-6"
        >
          {/* Row 1: Title and Author */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div>
              <label className={labelClass}>Book Title *</label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Book title"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Author *</label>

              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 2: Category and Copies */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div>
              <label className={labelClass}>Category *</label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`${inputClass} dark:bg-[#1E2B26]`}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Total Copies *</label>

              <input
                type="number"
                min="1"
                step="1"
                value={totalCopies}
                onChange={(e) => setTotalCopies(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Image Section */}
          <div>
            <label className={labelClass}>Book Image *</label>

            <input
              type="url"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
                setSelectedFile(null);
                setPreview(e.target.value);
              }}
              placeholder="Paste image URL"
              className={inputClass}
            />

            <div className="my-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-[#E8E2D6] dark:bg-[#34453D]" />
              <span className="text-[10px] text-[#66736B] dark:text-[#AAB7AE]">
                OR UPLOAD IMAGE
              </span>
              <div className="h-px flex-1 bg-[#E8E2D6] dark:bg-[#34453D]" />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
              className="w-full text-[10px] text-[#66736B] file:mr-2 file:rounded-md file:border-0 file:bg-[#263D36] file:px-2.5 file:py-1.5 file:text-[10px] file:font-medium file:text-white dark:text-[#AAB7AE] sm:text-xs"
            />

            {preview && (
              <div className="relative mt-2 h-28 w-20 overflow-hidden rounded-lg border border-[#E8E2D6] dark:border-[#34453D] sm:h-36 sm:w-28">
                <Image
                  src={preview}
                  alt="Book preview"
                  fill
                  unoptimized
                  className="object-cover"
                  onError={() => setPreview("")}
                />
              </div>
            )}

            <p className="mt-1 text-[10px] text-[#66736B] dark:text-[#AAB7AE]">
              Maximum image size: 5 MB
            </p>
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description *</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write book description..."
              rows={3}
              required
              className={`${inputClass} resize-y`}
            />
          </div>

          {/* Note */}
          <p className="text-[10px] leading-relaxed text-[#66736B] dark:text-[#AAB7AE] sm:text-xs">
            Note: Total copies cannot be reduced below the number of currently
            borrowed copies.
          </p>

          {/* Error */}
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700 dark:bg-green-950/30 dark:text-green-400">
              {success}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-2 pt-1">
            <Link
              href="/my-books"
              className="flex flex-1 items-center justify-center rounded-lg border border-[#E8E2D6] px-3 py-2 text-xs font-semibold text-[#263D36] transition hover:bg-[#F5F0E6] dark:border-[#34453D] dark:text-[#F5F0E6] dark:hover:bg-[#263D36] sm:py-2.5 sm:text-sm"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="flex flex-1 items-center justify-center rounded-lg bg-[#263D36] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#344F44] disabled:cursor-not-allowed disabled:opacity-60 sm:py-2.5 sm:text-sm"
            >
              {submitting ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
