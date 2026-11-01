import Image from "next/image";
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
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E8E2D6] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-[#34453D] dark:bg-[#1E2B26]">
      {/* Book Cover */}
      <Link
        href={`/books/${book._id}`}
        className="relative block overflow-hidden bg-[#F5F0E6] dark:bg-[#263D36]"
      >
        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden p-3 sm:aspect-[5/4] sm:p-4 lg:aspect-[4/3] lg:p-8 xl:aspect-[5/4]">
          {book.image ? (
            <Image
              src={book.image}
              alt={book.title}
              width={300}
              height={400}
              className="h-full w-full scale-125 rounded-md object-contain transition duration-500 group-hover:scale-[1.3]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-5xl">
              📚
            </div>
          )}
        </div>

        {/* Category Badge */}
        <span className="absolute left-2 top-2 max-w-[85%] truncate rounded-md bg-white/95 px-2 py-1 text-[9px] font-bold text-[#263D36] shadow-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-[10px] dark:bg-[#121B18]/95 dark:text-[#E5A66F]">
          {book.category}
        </span>
      </Link>

      {/* Book Information */}
      <div className="flex flex-1 flex-col p-3 sm:p-4 lg:p-6">
        <h3 className="line-clamp-2 text-sm font-bold leading-5 text-[#263D36] transition group-hover:text-[#BD7641] dark:text-[#F5F0E6] dark:group-hover:text-[#E5A66F] sm:text-base sm:leading-6">
          {book.title}
        </h3>

        <p className="mt-1.5 truncate text-[11px] text-[#66736B] dark:text-[#AAB7AE] sm:text-xs">
          By {book.author}
        </p>

        {/* Availability */}
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#E8E2D6] pt-3 dark:border-[#34453D]">
          <span className="text-[10px] text-[#66736B] dark:text-[#AAB7AE] sm:text-xs">
            Available
          </span>

          <span
            className={`text-[10px] font-bold sm:text-xs ${
              book.availableCopies > 0
                ? "text-[#367653] dark:text-[#79C99A]"
                : "text-red-600 dark:text-red-400"
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
          className="mt-4 block rounded-md bg-[#263D36] px-3 py-2.5 text-center text-[11px] font-bold text-white transition hover:bg-[#3B594D] dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F] sm:text-xs"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
