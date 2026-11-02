import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#F5F0E6] px-4 py-12 dark:bg-[#121B18]">
      <section className="w-full max-w-lg text-center">
        <p className="text-sm font-bold uppercase tracking-[4px] text-[#BD7641] dark:text-[#E5A66F]">
          BookNook
        </p>

        <h1 className="mt-4 text-8xl font-extrabold text-[#263D36] dark:text-[#F5F0E6] sm:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-[#263D36] dark:text-[#F5F0E6]">
          Page Not Found
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#66736B] dark:text-[#AAB7AE]">
          Sorry! The page you are looking for does not exist or may have been
          moved.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center justify-center rounded-lg bg-[#263D36] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3B594D] dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F]"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
