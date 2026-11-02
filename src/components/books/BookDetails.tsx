"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Book } from "@/components/home/BookCard";
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface BookDetailsProps {
  id: string;
}

export default function BookDetails({ id }: BookDetailsProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState("14");
  const [borrowing, setBorrowing] = useState(false);

  // Fetch Book Details
  useEffect(() => {
    const controller = new AbortController();

    async function fetchBook() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/books/${id}`, {
          signal: controller.signal,
          cache: "no-store",
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

  // Calculate Return Date
  const getReturnDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + Number(duration));
    return date;
  };

  // Borrow Book
  const handleBorrow = async () => {
    setMessage("");

    if (!session) {
      router.push("/login");
      return;
    }

    if (!book || book.availableCopies <= 0) {
      setMessage("This book is currently unavailable.");
      return;
    }

    try {
      setBorrowing(true);

      const tokenData = await authClient.token();
      const token = tokenData.data?.token;

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const returnDate = getReturnDate().toISOString();

      const response = await fetch(`${API_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId: id,
          returnDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to borrow book.");
      }

      setBook((previous) =>
        previous
          ? {
              ...previous,
              availableCopies: previous.availableCopies - 1,
            }
          : previous,
      );

      setMessage(
        `Book borrowed successfully! Please return it by ${getReturnDate().toLocaleDateString()}.`,
      );
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBorrowing(false);
    }
  };

  // Loading State
  if (loading || isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F5F0E6] dark:bg-[#121B18]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D18B55]/20 border-t-[#263D36] dark:border-t-[#D18B55]" />
      </main>
    );
  }

  // Error State
  if (error || !book) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#F5F0E6] px-4 text-center dark:bg-[#121B18]">
        <div className="text-5xl">📚</div>

        <h2 className="mt-4 text-xl font-bold text-[#263D36] dark:text-[#F5F0E6]">
          {error || "Book not found"}
        </h2>

        <Link
          href="/books"
          className="mt-5 rounded-lg bg-[#263D36] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3B594D] dark:bg-[#D18B55] dark:text-[#121B18]"
        >
          Back to All Books
        </Link>
      </main>
    );
  }

  const returnDate = getReturnDate();

  return (
    <main className="min-h-screen bg-[#F5F0E6] px-3 py-8 dark:bg-[#121B18] sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Back Link */}
        <Link
          href="/books"
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-[#66736B] transition hover:text-[#BD7641] dark:text-[#AAB7AE] dark:hover:text-[#E5A66F] sm:text-sm"
        >
          ← Back to All Books
        </Link>

        <section className="grid overflow-hidden rounded-2xl border border-[#E8E2D6] bg-white shadow-sm dark:border-[#34453D] dark:bg-[#1E2B26] md:grid-cols-2">
          {/* Book Image */}
          <div className="flex min-h-[280px] items-center justify-center border-b border-[#E8E2D6] bg-[#EEE8DC] p-6 dark:border-[#34453D] dark:bg-[#263D36] sm:min-h-[450px] sm:border-b-0 sm:border-r sm:p-10">
            {book.image ? (
              <div className="relative h-[280px] w-[220px] overflow-hidden rounded-lg border-2 border-[#D8CDBB] bg-white p-2 shadow-lg dark:border-[#52685B] dark:bg-[#1E2B26] sm:h-[380px] sm:w-[280px]">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 220px, 280px"
                  className="rounded-md object-contain"
                />
              </div>
            ) : (
              <div className="flex h-[280px] w-[220px] items-center justify-center rounded-lg border-2 border-[#D8CDBB] bg-white text-8xl shadow-lg dark:border-[#52685B] dark:bg-[#1E2B26]">
                📚
              </div>
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

            {/* Description */}
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

            {/* Borrow Duration */}
            {book.availableCopies > 0 && (
              <div className="mb-4">
                <label
                  htmlFor="duration"
                  className="mb-2 block text-sm font-semibold text-[#263D36] dark:text-[#F5F0E6]"
                >
                  Choose Borrow Duration
                </label>

                <select
                  id="duration"
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  className="w-full rounded-lg border border-[#E8E2D6] bg-white px-4 py-3 text-sm text-[#263D36] outline-none transition focus:border-[#D18B55] dark:border-[#34453D] dark:bg-[#121B18] dark:text-[#F5F0E6]"
                >
                  <option value="7">7 Days</option>
                  <option value="14">14 Days</option>
                  <option value="21">21 Days</option>
                  <option value="30">30 Days</option>
                </select>

                <p className="mt-2 text-xs text-[#66736B] dark:text-[#AAB7AE]">
                  Expected return date:{" "}
                  <span className="font-semibold">
                    {returnDate.toLocaleDateString()}
                  </span>
                </p>
              </div>
            )}

            {/* Success / Error Message */}
            {message && (
              <div
                className={`mb-4 rounded-lg p-3 text-sm ${
                  message.startsWith("Book borrowed successfully")
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                }`}
              >
                {message}
              </div>
            )}

            {/* Borrow Button */}
            <button
              onClick={handleBorrow}
              disabled={borrowing || book.availableCopies <= 0}
              className="w-full rounded-lg bg-[#263D36] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#3B594D] disabled:cursor-not-allowed disabled:bg-gray-400 dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F] dark:disabled:bg-gray-600 dark:disabled:text-gray-300 sm:text-sm"
            >
              {borrowing
                ? "Processing..."
                : book.availableCopies > 0
                  ? "Borrow This Book"
                  : "Currently Unavailable"}
            </button>

            <Link
              href="/my-borrows"
              className="mt-4 text-center text-sm font-semibold text-[#BD7641] transition hover:underline dark:text-[#E5A66F]"
            >
              View My Borrows →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
