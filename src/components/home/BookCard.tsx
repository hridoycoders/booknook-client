import Link from "next/link";

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  userName?: string;
  createdAt?: string;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#e8e2d6] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Book Cover */}
      <Link
        href={`/books/${book._id}`}
        className="relative block overflow-hidden bg-[#f5f0e6]"
      >
        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden p-3 sm:aspect-[4/5] sm:p-5">
          {book.image ? (
            <img
              src={book.image}
              alt={book.title}
              loading="lazy"
              className="h-full w-full rounded-md object-contain transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-5xl">
              📚
            </div>
          )}
        </div>

        <span className="absolute left-2 top-2 max-w-[85%] truncate rounded-md bg-white/95 px-2 py-1 text-[9px] font-bold text-[#263d36] shadow-sm sm:left-3 sm:top-3 sm:px-3 sm:text-[10px]">
          {book.category}
        </span>
      </Link>

      {/* Book Information */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-5 text-[#263d36] transition group-hover:text-[#bd7641] sm:text-base sm:leading-6">
          {book.title}
        </h3>

        <p className="mt-1 truncate text-[11px] text-[#66736b] sm:text-xs">
          By {book.author}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#e8e2d6] pt-3">
          <span className="text-[10px] text-[#66736b] sm:text-xs">
            Available
          </span>

          <span
            className={`text-[10px] font-bold sm:text-xs ${
              book.availableCopies > 0 ? "text-[#367653]" : "text-red-600"
            }`}
          >
            {book.availableCopies > 0
              ? `${book.availableCopies} Copies`
              : "Out of Stock"}
          </span>
        </div>

        {/* Details Button */}
        <Link
          href={`/books/${book._id}`}
          className="mt-4 block rounded-md bg-[#263d36] px-3 py-2.5 text-center text-[11px] font-bold text-white transition hover:bg-[#3b594d] sm:text-xs"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
