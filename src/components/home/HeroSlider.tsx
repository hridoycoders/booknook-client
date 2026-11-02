"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  return (
    <section className="mx-auto w-full max-w-7xl px-3 py-0 sm:px-6 sm:py-1 lg:px-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        className="booknook-swiper overflow-hidden rounded-xl border border-[#E8E2D6] bg-white dark:border-[#34453D] dark:bg-[#1E2B26] sm:rounded-2xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.eyebrow}>
            <div className="grid items-center gap-5 p-4 sm:gap-8 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
              {/* Hero Image */}
              <div className="order-1 min-w-0 lg:order-2">
                <div className="relative mx-auto max-w-[540px]">
                  <div className="absolute -right-2 -top-2 h-12 w-12 rounded-tr-xl border-r-2 border-t-2 border-[#D18B55] sm:h-20 sm:w-20" />

                  <div className="relative overflow-hidden rounded-lg bg-[#F5F0E6] dark:bg-[#263D36] sm:rounded-xl">
                    <div
                      role="img"
                      aria-label={slide.imageAlt}
                      className="aspect-[16/9] w-full bg-cover bg-center sm:aspect-[5/4] lg:aspect-[4/5]"
                      style={{
                        backgroundImage: `url("${slide.image}")`,
                      }}
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#182b25]/80 to-transparent p-3 pt-10 sm:p-5 sm:pt-16">
                      <p className="text-sm font-bold text-white sm:text-lg">
                        {slide.imageTitle}
                      </p>
                      <p className="mt-1 text-[10px] text-white/75 sm:text-xs">
                        Discover your next favorite story
                      </p>
                    </div>
                  </div>

                  <div className="absolute -bottom-2 -left-2 h-10 w-10 rounded-bl-xl border-b-2 border-l-2 border-[#D18B55] sm:h-16 sm:w-16" />
                </div>
              </div>

              {/* Hero Content */}
              <div className="order-2 min-w-0 lg:order-1">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F5F0E6] px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] text-[#A96D3E] dark:bg-[#263D36] dark:text-[#E5A66F] sm:px-4 sm:py-2 sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D18B55]" />
                  {slide.eyebrow}
                </span>

                <h1 className="mt-4 max-w-xl text-[30px] font-extrabold leading-[1.15] tracking-tight text-[#263D36] dark:text-[#F5F0E6] min-[400px]:text-[34px] sm:mt-5 sm:text-[40px] sm:leading-tight md:text-5xl lg:text-[56px]">
                  {slide.title.split(" ").map((word, index) => {
                    const highlightedWords = ["Magic", "Somewhere", "More."];

                    return (
                      <span
                        key={`${word}-${index}`}
                        className={
                          highlightedWords.includes(word)
                            ? "text-[#D18B55] dark:text-[#E5A66F]"
                            : ""
                        }
                      >
                        {word}{" "}
                      </span>
                    );
                  })}
                </h1>

                <p className="mt-3 max-w-lg text-[13px] leading-6 text-[#66736B] dark:text-[#AAB7AE] sm:mt-5 sm:text-sm sm:leading-7 lg:text-base lg:leading-8">
                  {slide.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7 sm:gap-4">
                  <Link
                    href={slide.buttonLink}
                    className="inline-flex items-center gap-2 rounded-md bg-[#263D36] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#3B594D] dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F] sm:gap-3 sm:px-6 sm:py-3.5 sm:text-sm"
                  >
                    {slide.buttonText}
                    <span aria-hidden="true">→</span>
                  </Link>

                  <Link
                    href="/books"
                    className="text-xs font-semibold text-[#263D36] transition hover:text-[#D18B55] dark:text-[#F5F0E6] dark:hover:text-[#E5A66F] sm:text-sm"
                  >
                    Discover More
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
