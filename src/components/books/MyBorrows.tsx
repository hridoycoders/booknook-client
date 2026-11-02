"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userName: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
  actualReturnDate?: string;
  status: string;
}

type Tab = "active" | "returned";

export default function MyBorrows() {
  const { data: session, isPending } = authClient.useSession();

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("active");
  const [returningId, setReturningId] = useState<string | null>(null);

  const fetchMyBorrows = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const tokenData = await authClient.token();
      const token = tokenData.data?.token;

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(`${API_URL}/borrows`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load borrowed books.");
      }

      setBorrows(Array.isArray(data) ? data : data.borrows || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isPending && session) {
      fetchMyBorrows();
    } else if (!isPending && !session) {
      setLoading(false);
    }
  }, [isPending, session, fetchMyBorrows]);

  const handleReturn = async (borrowId: string) => {
    try {
      setReturningId(borrowId);
      setError("");

      const tokenData = await authClient.token();
      const token = tokenData.data?.token;

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(`${API_URL}/borrows/${borrowId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to return book.");
      }

      toast.success("Book returned successfully!");

      await fetchMyBorrows();
      setActiveTab("returned");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to return book.";

      setError(message);
      toast.error(message);
    } finally {
      setReturningId(null);
    }
  };

  const activeBorrows = borrows.filter(
    (borrow) => borrow.status === "borrowed",
  );

  const returnedBorrows = borrows.filter(
    (borrow) => borrow.status === "returned",
  );

  const visibleBorrows =
    activeTab === "active" ? activeBorrows : returnedBorrows;

  if (isPending || loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F5F0E6] dark:bg-[#121B18]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D18B55]/20 border-t-[#263D36] dark:border-t-[#D18B55]" />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-[#263D36] dark:text-[#F5F0E6]">
          Please login first
        </h2>
        <Link
          href="/login"
          className="mt-4 rounded-lg bg-[#263D36] px-5 py-3 text-white dark:bg-[#D18B55] dark:text-[#121B18]"
        >
          Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F0E6] px-4 py-10 dark:bg-[#121B18] sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#BD7641] dark:text-[#E5A66F]">
            Your Reading Activity
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#263D36] dark:text-[#F5F0E6] sm:text-4xl">
            My Borrows
          </h1>

          <p className="mt-2 text-sm text-[#66736B] dark:text-[#AAB7AE]">
            Keep track of your borrowed books and reading history.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#E8E2D6] bg-white p-4 dark:border-[#34453D] dark:bg-[#1E2B26]">
            <p className="text-sm text-[#66736B] dark:text-[#AAB7AE]">
              Active Books
            </p>
            <p className="mt-1 text-2xl font-bold text-[#263D36] dark:text-[#F5F0E6]">
              {activeBorrows.length}
            </p>
          </div>

          <div className="rounded-xl border border-[#E8E2D6] bg-white p-4 dark:border-[#34453D] dark:bg-[#1E2B26]">
            <p className="text-sm text-[#66736B] dark:text-[#AAB7AE]">
              Returned Books
            </p>
            <p className="mt-1 text-2xl font-bold text-[#263D36] dark:text-[#F5F0E6]">
              {returnedBorrows.length}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 flex gap-3 border-b border-[#E8E2D6] dark:border-[#34453D]">
          <button
            onClick={() => setActiveTab("active")}
            className={`border-b-2 px-4 py-3 text-sm font-semibold transition ${
              activeTab === "active"
                ? "border-[#263D36] text-[#263D36] dark:border-[#D18B55] dark:text-[#E5A66F]"
                : "border-transparent text-[#66736B] dark:text-[#AAB7AE]"
            }`}
          >
            Active ({activeBorrows.length})
          </button>

          <button
            onClick={() => setActiveTab("returned")}
            className={`border-b-2 px-4 py-3 text-sm font-semibold transition ${
              activeTab === "returned"
                ? "border-[#263D36] text-[#263D36] dark:border-[#D18B55] dark:text-[#E5A66F]"
                : "border-transparent text-[#66736B] dark:text-[#AAB7AE]"
            }`}
          >
            Returned ({returnedBorrows.length})
          </button>
        </div>

        {/* Empty State */}
        {visibleBorrows.length === 0 ? (
          <div className="rounded-2xl border border-[#E8E2D6] bg-white px-5 py-16 text-center dark:border-[#34453D] dark:bg-[#1E2B26]">
            <div className="text-5xl">📚</div>

            <h2 className="mt-4 text-xl font-bold text-[#263D36] dark:text-[#F5F0E6]">
              {activeTab === "active"
                ? "No active borrowed books"
                : "No returned books yet"}
            </h2>

            <p className="mt-2 text-sm text-[#66736B] dark:text-[#AAB7AE]">
              {activeTab === "active"
                ? "Explore our collection and borrow a book."
                : "Your returned books will appear here."}
            </p>

            {activeTab === "active" && (
              <Link
                href="/books"
                className="mt-5 inline-block rounded-lg bg-[#263D36] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3B594D] dark:bg-[#D18B55] dark:text-[#121B18]"
              >
                Browse Books
              </Link>
            )}
          </div>
        ) : (
          /* Borrow Cards */
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleBorrows.map((borrow) => (
              <article
                key={borrow._id}
                className="overflow-hidden rounded-2xl border border-[#E8E2D6] bg-white p-4 shadow-sm transition hover:shadow-md dark:border-[#34453D] dark:bg-[#1E2B26]"
              >
                <div className="flex gap-4">
                  <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-[#F5F0E6] dark:bg-[#121B18]">
                    {borrow.bookImage ? (
                      <Image
                        src={borrow.bookImage}
                        alt={borrow.bookTitle}
                        fill
                        unoptimized
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-3xl">
                        📚
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="line-clamp-2 font-bold text-[#263D36] dark:text-[#F5F0E6]">
                      {borrow.bookTitle}
                    </h2>

                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        borrow.status === "borrowed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {borrow.status === "borrowed" ? "Active" : "Returned"}
                    </span>

                    <p className="mt-3 text-xs text-[#66736B] dark:text-[#AAB7AE]">
                      Borrowed:{" "}
                      {new Date(borrow.borrowDate).toLocaleDateString()}
                    </p>

                    <p className="mt-1 text-xs text-[#66736B] dark:text-[#AAB7AE]">
                      Return by:{" "}
                      {new Date(borrow.returnDate).toLocaleDateString()}
                    </p>

                    {borrow.actualReturnDate && (
                      <p className="mt-1 text-xs text-[#66736B] dark:text-[#AAB7AE]">
                        Returned on:{" "}
                        {new Date(borrow.actualReturnDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {borrow.status === "borrowed" && (
                  <button
                    onClick={() => handleReturn(borrow._id)}
                    disabled={returningId === borrow._id}
                    className="mt-5 w-full rounded-lg bg-[#263D36] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3B594D] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F]"
                  >
                    {returningId === borrow._id
                      ? "Returning..."
                      : "Return Book"}
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
