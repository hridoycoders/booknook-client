"use client";

import { useEffect, useMemo, useState } from "react";
import BookCard, { Book } from "@/components/home/BookCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AllBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBooks() {
      try {
        const response = await fetch(`${API_URL}/books`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load books.");
        }

        const result = await response.json();
        const bookList = Array.isArray(result) ? result : result.data || [];

        setBooks(bookList);
        setError("");
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchBooks();

    return () => controller.abort();
  }, []);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(books.map((book) => book.category)))];
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        book.title.toLowerCase().includes(searchText) ||
        book.author.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === "All" || book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [books, search, selectedCategory]);

  return (
    <main className="min-h-screen flex-1 bg-[#F5F0E6] transition-colors dark:bg-[#121B18]">
      <section className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-14 lg:px-8">
        {/* Heading */}
        <div className="mb-7 text-center sm:mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#BD7641] dark:text-[#E5A66F] sm:text-xs">
            Discover Your Next Read
          </p>

          <h1 className="mt-2 text-2xl font-bold text-[#263D36] dark:text-[#F5F0E6] sm:text-4xl">
            Explore All Books
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-[11px] leading-5 text-[#66736B] dark:text-[#AAB7AE] sm:text-sm">
            Find your next favorite book from our growing library.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mb-6 max-w-2xl">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by book title or author..."
            className="w-full rounded-xl border border-[#E8E2D6] bg-white px-4 py-3 text-xs text-[#263D36] outline-none transition placeholder:text-[#9CA39D] focus:border-[#D18B55] focus:ring-2 focus:ring-[#D18B55]/20 dark:border-[#34453D] dark:bg-[#1E2B26] dark:text-[#F5F0E6] dark:placeholder:text-[#849188] sm:text-sm"
          />
        </div>

        {/* Categories */}
        <div className="mb-7 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-3 py-2 text-[10px] font-semibold transition sm:px-5 sm:text-xs ${
                selectedCategory === category
                  ? "bg-[#263D36] text-white dark:bg-[#D18B55] dark:text-[#121B18]"
                  : "border border-[#E8E2D6] bg-white text-[#66736B] hover:border-[#D18B55] hover:text-[#263D36] dark:border-[#34453D] dark:bg-[#1E2B26] dark:text-[#AAB7AE] dark:hover:text-[#E5A66F]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Result Count */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#263D36] dark:text-[#F5F0E6] sm:text-lg">
            Available Collection
          </h2>

          <span className="text-[10px] text-[#66736B] dark:text-[#AAB7AE] sm:text-xs">
            {filteredBooks.length} Books Found
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-48 items-center justify-center">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#D18B55]/20 border-t-[#263D36] dark:border-t-[#D18B55]" />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-[#E8E2D6] bg-white p-8 text-center dark:border-[#34453D] dark:bg-[#1E2B26]">
            <p className="text-sm font-semibold text-red-600 dark:text-red-300">
              {error}
            </p>

            <p className="mt-2 text-xs text-[#66736B] dark:text-[#AAB7AE]">
              Please check your server connection and try again.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-[#263D36] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3B594D] dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Books Grid */}
        {!loading && !error && filteredBooks.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredBooks.length === 0 && (
          <div className="rounded-xl border border-[#E8E2D6] bg-white px-4 py-12 text-center dark:border-[#34453D] dark:bg-[#1E2B26]">
            <div className="text-4xl">📚</div>

            <h3 className="mt-3 text-base font-bold text-[#263D36] dark:text-[#F5F0E6]">
              No Books Found
            </h3>

            <p className="mt-2 text-xs text-[#66736B] dark:text-[#AAB7AE]">
              Try another search term or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-4 rounded-lg bg-[#263D36] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3B594D] dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
