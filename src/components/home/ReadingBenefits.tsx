const benefits = [
  {
    icon: "📚",
    title: "Explore More Books",
    description:
      "Discover books from different categories and explore new ideas every day.",
  },
  {
    icon: "🌱",
    title: "Grow Your Knowledge",
    description:
      "Build your knowledge, develop new skills, and learn something meaningful.",
  },
  {
    icon: "💡",
    title: "Discover New Ideas",
    description:
      "Explore different perspectives and let every book inspire your imagination.",
  },
];

export default function ReadingBenefits() {
  return (
    <section className="bg-white px-3 py-7 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-12">
          <span className="text-[9px] font-bold uppercase tracking-[1.5px] text-[#bd7641] sm:text-xs sm:tracking-[2px]">
            Why Reading Matters
          </span>

          <h2 className="mt-2 text-lg font-extrabold text-[#263d36] sm:text-3xl lg:text-4xl">
            Make Every Page Count
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-[10px] leading-4 text-[#66736b] sm:max-w-2xl sm:text-sm sm:leading-7">
            Every book opens a new door to knowledge, creativity, and
            inspiration.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5 lg:gap-7">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className="rounded-lg border border-[#e8e2d6] bg-[#f5f0e6] p-3 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-xl sm:p-6 lg:p-8"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-base sm:h-12 sm:w-12 sm:text-2xl">
                {benefit.icon}
              </div>

              <p className="mt-3 text-[9px] font-bold tracking-wider text-[#bd7641] sm:mt-4 sm:text-[10px] sm:tracking-widest">
                BENEFIT 0{index + 1}
              </p>

              <h3 className="mt-1.5 text-xs font-bold text-[#263d36] sm:mt-2 sm:text-lg">
                {benefit.title}
              </h3>

              <p className="mt-1.5 text-[10px] leading-4.25 text-[#66736b] sm:mt-2 sm:text-sm sm:leading-6">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
