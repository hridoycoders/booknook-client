const categories = [
  {
    name: "Fiction",
    description: "Novels and short stories",
    icon: "📖",
  },
  {
    name: "Science",
    description: "How the world works",
    icon: "🔬",
  },
  {
    name: "History",
    description: "Stories from the past",
    icon: "🏛️",
  },
  {
    name: "Kids",
    description: "Picture books and more",
    icon: "🧸",
  },
];

export default function TopCategories() {
  return (
    <section className="bg-white px-4 py-12 transition-colors dark:bg-[#121B18] sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-[2px] text-[#BD7641] dark:text-[#E5A66F]">
            Explore Our Collection
          </span>

          <h2 className="mt-3 text-2xl font-extrabold text-[#263D36] dark:text-[#F5F0E6] sm:text-3xl lg:text-4xl">
            Top Categories
          </h2>

          <p className="mt-3 text-sm text-[#66736B] dark:text-[#AAB7AE] sm:text-base">
            Pick a shelf and start reading.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {categories.map((category) => (
            <a
              key={category.name}
              href={`/books?category=${encodeURIComponent(category.name)}`}
              className="group rounded-xl border border-[#E8E2D6] bg-[#F5F0E6] p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-[#D18B55] hover:shadow-lg dark:border-[#34453D] dark:bg-[#1E2B26] sm:p-7"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-3xl transition group-hover:scale-110 dark:bg-[#263D36]">
                {category.icon}
              </div>

              <h3 className="mt-4 text-base font-bold text-[#263D36] dark:text-[#F5F0E6] sm:text-lg">
                {category.name}
              </h3>

              <p className="mt-2 text-xs leading-5 text-[#66736B] dark:text-[#AAB7AE] sm:text-sm">
                {category.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
