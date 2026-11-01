const steps = [
  {
    number: "01",
    icon: "🔎",
    title: "Explore Books",
    description:
      "Discover your next favorite book from our growing collection of books.",
  },
  {
    number: "02",
    icon: "📖",
    title: "Borrow a Book",
    description:
      "Choose a book you love and borrow an available copy from our library.",
  },
  {
    number: "03",
    icon: "✨",
    title: "Enjoy Reading",
    description:
      "Enjoy your reading journey and return the book when you are finished.",
  },
];

export default function BorrowingSteps() {
  return (
    <section className="px-3 py-8 transition-colors sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
          <span className="inline-block rounded-full bg-[#E9DFCF] px-3 py-1 text-[10px] font-bold uppercase tracking-[2px] text-[#8C5B35] dark:bg-[#34453D] dark:text-[#E5A66F] sm:text-xs">
            Simple & Easy
          </span>

          <h2 className="mt-3 text-xl font-bold leading-tight text-[#263D36] dark:text-[#F5F0E6] sm:text-3xl md:text-4xl">
            How BookNook Works
          </h2>

          <p className="mt-3 text-[11px] leading-6 text-[#66736B] dark:text-[#AAB7AE] sm:text-sm">
            Your next great read is just a few simple steps away.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-7">
          {steps.map((step) => (
            <article
              key={step.number}
              className="group relative rounded-xl border border-[#E8E2D6] bg-white p-3 transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-[#34453D] dark:bg-[#1E2B26] sm:p-6 lg:p-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F0E6] text-xl transition group-hover:scale-105 group-hover:bg-[#263D36] dark:bg-[#263D36] dark:group-hover:bg-[#D18B55] sm:h-14 sm:w-14 sm:text-2xl">
                  <span className="transition group-hover:grayscale group-hover:brightness-0 group-hover:invert">
                    {step.icon}
                  </span>
                </div>

                <span className="text-2xl font-extrabold text-[#E8E2D6] dark:text-[#34453D] sm:text-3xl">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-5 text-sm font-bold text-[#263D36] dark:text-[#F5F0E6] sm:text-lg">
                {step.title}
              </h3>

              <p className="mt-2 text-[11px] leading-6 text-[#66736B] dark:text-[#AAB7AE] sm:text-sm">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
