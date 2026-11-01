"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import BookCard, { Book } from "@/components/home/BookCard";
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function MyBooks() {
  const { data: session, isPending } = authClient.useSession();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = await authClient.token();

      if (!token?.data?.token) {
        throw new Error("Please log in to view your books.");
      }

      const response = await fetch(`${API_URL}/books/my-books`, {
        headers: {
          Authorization: `Bearer ${token.data.token}`,
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load your books.");
      }

      const result = await response.json();
      setBooks(Array.isArray(result) ? result : result.data || []);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isPending && session?.user) {
      fetchMyBooks();
    } else if (!isPending && !session?.user) {
      setLoading(false);
    }
  }, [isPending, session, fetchMyBooks]);

  const handleDelete = async (bookId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmed) return;

    try {
      const token = await authClient.token();

      if (!token?.data?.token) {
        throw new Error("Please log in again.");
      }

      const response = await fetch(`${API_URL}/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.data.token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete book.");
      }

      setBooks((previousBooks) =>
        previousBooks.filter((book) => book._id !== bookId),
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (isPending || loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F0E6] dark:bg-[#121B18]">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#D18B55]/20 border-t-[#263D36] dark:border-t-[#D18B55]" />
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F0E6] px-4 dark:bg-[#121B18]">
        <div className="w-full max-w-md rounded-xl border border-[#E8E2D6] bg-white p-8 text-center dark:border-[#34453D] dark:bg-[#1E2B26]">
          <h1 className="text-xl font-bold text-[#263D36] dark:text-[#F5F0E6]">
            Login Required
          </h1>
          <p className="mt-2 text-sm text-[#66736B] dark:text-[#AAB7AE]">
            Please log in to view your books.
          </p>
          <Link
            href="/login"
            className="mt-5 inline-block rounded-lg bg-[#263D36] px-5 py-3 text-sm font-semibold text-white dark:bg-[#D18B55] dark:text-[#121B18]"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex-1 bg-[#F5F0E6] transition-colors dark:bg-[#121B18]">
      <section className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#BD7641] dark:text-[#E5A66F] sm:text-xs">
            Your Personal Collection
          </p>

          <h1 className="mt-2 text-2xl font-bold text-[#263D36] dark:text-[#F5F0E6] sm:text-4xl">
            My Books
          </h1>

          <p className="mt-2 text-xs text-[#66736B] dark:text-[#AAB7AE] sm:text-sm">
            Manage the books you have added to BookNook.
          </p>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#263D36] dark:text-[#F5F0E6] sm:text-lg">
            Your Collection
          </h2>

          <span className="text-xs text-[#66736B] dark:text-[#AAB7AE]">
            {books.length} Books
          </span>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-white p-6 text-center dark:border-red-900 dark:bg-[#1E2B26]">
            <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
            <button
              onClick={fetchMyBooks}
              className="mt-4 rounded-lg bg-[#263D36] px-5 py-2 text-xs font-semibold text-white dark:bg-[#D18B55] dark:text-[#121B18]"
            >
              Try Again
            </button>
          </div>
        )}

        {!error && books.length === 0 && (
          <div className="rounded-xl border border-[#E8E2D6] bg-white px-4 py-12 text-center dark:border-[#34453D] dark:bg-[#1E2B26]">
            <div className="text-4xl">📚</div>
            <h3 className="mt-3 text-base font-bold text-[#263D36] dark:text-[#F5F0E6]">
              No Books Added Yet
            </h3>
            <p className="mt-2 text-xs text-[#66736B] dark:text-[#AAB7AE]">
              Start building your personal collection.
            </p>
            <Link
              href="/add-book"
              className="mt-5 inline-block rounded-lg bg-[#263D36] px-5 py-3 text-xs font-semibold text-white dark:bg-[#D18B55] dark:text-[#121B18]"
            >
              Add Your First Book
            </Link>
          </div>
        )}

        {!error && books.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {books.map((book) => (
              <div key={book._id} className="flex flex-col">
                <div className="flex-1">
                  <BookCard book={book} />
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Link
                    href={`/edit-book/${book._id}`}
                    className="rounded-md border border-[#D18B55] px-2 py-2 text-center text-[10px] font-bold text-[#BD7641] transition hover:bg-[#D18B55] hover:text-white dark:text-[#E5A66F] dark:hover:text-[#121B18] sm:text-xs"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(book._id)}
                    className="rounded-md border border-red-300 px-2 py-2 text-[10px] font-bold text-red-600 transition hover:bg-red-600 hover:text-white dark:border-red-800 dark:text-red-400 sm:text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
