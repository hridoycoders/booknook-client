"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Book } from "@/components/home/BookCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface BookDetailsProps {
  id: string;
}

export default function BookDetails({ id }: BookDetailsProps) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBook() {
      try {
        const response = await fetch(`${API_URL}/books/${id}`, {
          signal: controller.signal,
        });

        if (response.status === 404) {
          throw new Error("Book not found.");
        }

        if (!response.ok) {
          throw new Error("Failed to load book details.");
        }

        const result = await response.json();
        setBook(result.data || result);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchBook();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center theme-bg">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D18B55]/20 border-t-[#263D36] dark:border-t-[#D18B55]" />
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[var(--background)] px-4 text-center">
        <div className="text-5xl">📚</div>

        <h2 className="mt-4 text-xl font-bold theme-text">
          {error || "Book not found"}
        </h2>

        <Link
          href="/books"
          className="mt-5 rounded-lg bg-[#263D36] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3B594D] dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F]"
        >
          Back to All Books
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F0E6] px-3 py-8 dark:bg-[#121B18] sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/books"
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-[#66736B] transition hover:text-[#BD7641] dark:text-[#AAB7AE] dark:hover:text-[#E5A66F] sm:text-sm"
        >
          ← Back to All Books
        </Link>

        <section className="grid overflow-hidden rounded-2xl border border-[#E8E2D6] bg-white shadow-sm dark:border-[#34453D] dark:bg-[#1E2B26] md:grid-cols-2">
          {/* Book Image */}
          <div className="flex min-h-[280px] items-center justify-center bg-[#EEE8DC] p-8 dark:bg-[#263D36] sm:min-h-[450px] sm:p-12">
            {book.image ? (
              <img
                src={book.image}
                alt={book.title}
                className="max-h-[380px] w-full object-contain"
              />
            ) : (
              <div className="text-8xl">📚</div>
            )}
          </div>

          {/* Book Information */}
          <div className="flex flex-col justify-center p-5 sm:p-10">
            <span className="w-fit rounded-full bg-[#F5F0E6] px-3 py-1.5 text-[10px] font-bold text-[#BD7641] dark:bg-[#263D36] dark:text-[#E5A66F] sm:text-xs">
              {book.category}
            </span>

            <h1 className="mt-4 text-2xl font-bold leading-tight text-[#263D36] dark:text-[#F5F0E6] sm:text-4xl">
              {book.title}
            </h1>

            <p className="mt-2 text-xs text-[#66736B] dark:text-[#AAB7AE] sm:text-sm">
              Written by{" "}
              <span className="font-semibold text-[#263D36] dark:text-[#F5F0E6]">
                {book.author}
              </span>
            </p>

            <div className="my-6 border-t border-[#E8E2D6] dark:border-[#34453D]" />

            <h2 className="text-sm font-bold text-[#263D36] dark:text-[#F5F0E6] sm:text-base">
              About This Book
            </h2>

            <p className="mt-3 text-xs leading-6 text-[#66736B] dark:text-[#AAB7AE] sm:text-sm sm:leading-7">
              {book.description || "No description available for this book."}
            </p>

            {/* Book Copies */}
            <div className="my-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#F5F0E6] p-3 dark:bg-[#263D36] sm:p-4">
                <p className="text-[10px] text-[#66736B] dark:text-[#AAB7AE] sm:text-xs">
                  Total Copies
                </p>

                <p className="mt-1 text-lg font-bold text-[#263D36] dark:text-[#F5F0E6]">
                  {book.totalCopies}
                </p>
              </div>

              <div className="rounded-xl bg-[#F5F0E6] p-3 dark:bg-[#263D36] sm:p-4">
                <p className="text-[10px] text-[#66736B] dark:text-[#AAB7AE] sm:text-xs">
                  Available Copies
                </p>

                <p
                  className={`mt-1 text-lg font-bold ${
                    book.availableCopies > 0
                      ? "text-green-700 dark:text-[#79C99A]"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {book.availableCopies}
                </p>
              </div>
            </div>

            {/* Borrow Button */}
            <button
              disabled={book.availableCopies <= 0}
              className="w-full rounded-lg bg-[#263D36] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#3B594D] disabled:cursor-not-allowed disabled:bg-gray-400 dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F] dark:disabled:bg-gray-600 dark:disabled:text-gray-300 sm:text-sm"
            >
              {book.availableCopies > 0
                ? "Borrow This Book"
                : "Currently Unavailable"}
            </button>

            <p className="mt-3 text-center text-[10px] text-[#66736B] dark:text-[#AAB7AE]">
              Borrowing functionality will be connected next.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
