export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F5F0E6] px-4 dark:bg-[#121B18]">
      <div className="flex flex-col items-center text-center">
        {/* Spinner */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-[#E8E2D6] border-t-[#BD7641] dark:border-[#34453D] dark:border-t-[#E5A66F]" />

          <span className="text-xl font-bold text-[#263D36] dark:text-[#F5F0E6]">
            B
          </span>
        </div>

        <h2 className="mt-5 text-lg font-bold text-[#263D36] dark:text-[#F5F0E6]">
          BookNook
        </h2>

        <p className="mt-2 text-sm text-[#66736B] dark:text-[#AAB7AE]">
          Loading your reading experience...
        </p>
      </div>
    </main>
  );
}
