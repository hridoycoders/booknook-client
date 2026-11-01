"use client";

import { useState } from "react";
import Link from "next/link";

const slides = [
  {
    eyebrow: "WELCOME TO BOOKNOOK",
    title: "Rediscover the Magic of Reading",
    description:
      "Explore a world of knowledge, imagination, and inspiration. Find your next favorite book and make every reading moment special.",
    buttonText: "Explore Books",
    buttonLink: "/books",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A beautiful library filled with books",
    imageTitle: "The Reading Library",
  },
  {
    eyebrow: "EXPLORE NEW STORIES",
    title: "Every Book Takes You Somewhere",
    description:
      "From exciting adventures to timeless classics, discover books that open your mind and take your imagination further.",
    buttonText: "Browse Collection",
    buttonLink: "/books",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A cozy reading space with books",
    imageTitle: "Stories Beyond Pages",
  },
  {
    eyebrow: "YOUR READING COMMUNITY",
    title: "Read More. Discover More.",
    description:
      "Build your personal reading journey, borrow exciting books, and make reading a part of your everyday life.",
    buttonText: "Join BookNook",
    buttonLink: "/signup",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A collection of colorful books",
    imageTitle: "A World of Knowledge",
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentSlide = slides[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === slides.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-3 pb-6 pt-4 sm:px-6 sm:pb-10 sm:pt-8 lg:px-8 lg:pt-10">
      <div className="overflow-hidden rounded-xl border border-[#e8e2d6] bg-white sm:rounded-2xl">
        <div className="grid items-center gap-5 p-4 sm:gap-8 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
          {/* Hero Image */}
          <div className="order-1 min-w-0 lg:order-2">
            <div className="relative mx-auto max-w-[540px]">
              <div className="absolute -right-2 -top-2 h-12 w-12 rounded-tr-xl border-r-2 border-t-2 border-[#d18b55] sm:h-20 sm:w-20" />

              <div className="relative overflow-hidden rounded-lg bg-[#f5f0e6] sm:rounded-xl">
                <div
                  key={currentSlide.image}
                  role="img"
                  aria-label={currentSlide.imageAlt}
                  className="aspect-[16/9] w-full bg-cover bg-center sm:aspect-[5/4] lg:aspect-[4/5]"
                  style={{
                    backgroundImage: `url("${currentSlide.image}")`,
                  }}
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#182b25]/80 to-transparent p-3 pt-10 sm:p-5 sm:pt-16">
                  <p className="text-sm font-bold text-white sm:text-lg">
                    {currentSlide.imageTitle}
                  </p>
                  <p className="mt-1 text-[10px] text-white/75 sm:text-xs">
                    Discover your next favorite story
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-2 -left-2 h-10 w-10 rounded-bl-xl border-b-2 border-l-2 border-[#d18b55] sm:h-16 sm:w-16" />
            </div>
          </div>

          {/* Hero Content */}
          <div className="order-2 min-w-0 lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f5f0e6] px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] text-[#a96d3e] sm:px-4 sm:py-2 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d18b55]" />
              {currentSlide.eyebrow}
            </span>

            <h1 className="mt-4 max-w-xl text-[30px] font-extrabold leading-[1.15] tracking-tight text-[#263d36] min-[400px]:text-[34px] sm:mt-5 sm:text-[40px] sm:leading-tight md:text-5xl lg:text-[56px]">
              {currentSlide.title.split(" ").map((word, index) => {
                const highlightedWords = ["Magic", "Somewhere", "More."];

                return (
                  <span
                    key={`${word}-${index}`}
                    className={
                      highlightedWords.includes(word) ? "text-[#d18b55]" : ""
                    }
                  >
                    {word}{" "}
                  </span>
                );
              })}
            </h1>

            <p className="mt-3 max-w-lg text-[13px] leading-6 text-[#66736b] sm:mt-5 sm:text-sm sm:leading-7 lg:text-base lg:leading-8">
              {currentSlide.description}
            </p>

            {/* Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7 sm:gap-4">
              <Link
                href={currentSlide.buttonLink}
                className="inline-flex items-center gap-2 rounded-md bg-[#263d36] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#3b594d] sm:gap-3 sm:px-6 sm:py-3.5 sm:text-sm"
              >
                {currentSlide.buttonText}
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/books"
                className="text-xs font-semibold text-[#263d36] transition hover:text-[#d18b55] sm:text-sm"
              >
                Discover More
              </Link>
            </div>

            {/* Slider Controls */}
            <div className="mt-6 flex items-center gap-3 sm:mt-9 sm:gap-4">
              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous slide"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e8e2d6] text-sm text-[#263d36] transition hover:bg-[#263d36] hover:text-white sm:h-10 sm:w-10 sm:text-lg"
              >
                ←
              </button>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.eyebrow}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={activeIndex === index ? "true" : undefined}
                    className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                      activeIndex === index
                        ? "w-6 bg-[#d18b55] sm:w-8"
                        : "w-1.5 bg-[#d9d5ca] sm:w-2"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next slide"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e8e2d6] text-sm text-[#263d36] transition hover:bg-[#263d36] hover:text-white sm:h-10 sm:w-10 sm:text-lg"
              >
                →
              </button>

              <span className="ml-1 text-[10px] font-bold tracking-widest text-[#66736b] sm:text-xs">
                0{activeIndex + 1} / 0{slides.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
