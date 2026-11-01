"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import BookCard, { type Book } from "./BookCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch books from the server
  const fetchBooks = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch(`${API_URL}/books`, { signal });

      if (!response.ok) {
        throw new Error("Unable to load books. Please try again.");
      }

      const result = await response.json();

      const bookList: Book[] = Array.isArray(result)
        ? result
        : Array.isArray(result.data)
          ? result.data
          : [];

      const latestBooks = [...bookList]
        .sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime(),
        )
        .slice(0, 6);

      setBooks(latestBooks);
      setError("");
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message || "Something went wrong.");
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  // Initial API request
  useEffect(() => {
    const controller = new AbortController();

    const loadBooks = async () => {
      await fetchBooks(controller.signal);
    };

    loadBooks();

    return () => {
      controller.abort();
    };
  }, [fetchBooks]);

  // Retry API request
  const handleRetry = () => {
    setLoading(true);
    setError("");
    fetchBooks();
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      {/* Section Heading */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
        <div className="w-full">
          <p className="text-center text-[10px] font-bold tracking-[0.18em] text-[#bd7641] sm:text-xs">
            FRESH FROM OUR LIBRARY
          </p>

          <div className="mb-6 text-center sm:mb-10">
            <h2 className="mt-2 text-xl font-extrabold tracking-tight text-[#263d36] sm:text-3xl lg:text-4xl">
              New Arrivals
            </h2>

            <p className="mx-auto mt-2 max-w-md text-[11px] leading-5 text-[#66736b] sm:text-sm sm:leading-7">
              Discover the latest additions to our growing book collection.
            </p>
          </div>
        </div>

        <Link
          href="/books"
          className="inline-flex w-fit shrink-0 items-center gap-2 text-xs font-bold text-[#263d36] transition hover:text-[#bd7641] sm:mb-10 sm:text-sm"
        >
          View All Books <span>→</span>
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-xl border border-[#e8e2d6] bg-white p-3 sm:p-4"
            >
              <div className="aspect-[4/3] rounded-lg bg-[#e8e2d6] sm:aspect-[4/5]" />
              <div className="mt-4 h-3 w-3/4 rounded bg-[#e8e2d6]" />
              <div className="mt-3 h-2 w-1/2 rounded bg-[#eee9df]" />
              <div className="mt-5 h-8 rounded bg-[#e8e2d6]" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-8 text-center">
          <p className="text-sm font-semibold text-red-700">{error}</p>

          <button
            type="button"
            onClick={handleRetry}
            className="mt-4 rounded-md bg-[#263d36] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#3b594d]"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && books.length === 0 && (
        <div className="mt-8 rounded-xl border border-dashed border-[#d9d2c5] bg-white px-4 py-10 text-center sm:py-12">
          <p className="text-3xl">📚</p>

          <h3 className="mt-3 text-sm font-bold text-[#263d36] sm:text-base">
            No Books Available Yet
          </h3>

          <p className="mt-2 text-[11px] text-[#66736b] sm:text-sm">
            New books will appear here when they are added.
          </p>
        </div>
      )}

      {/* Books Grid */}
      {!loading && !error && books.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-5 lg:gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}
