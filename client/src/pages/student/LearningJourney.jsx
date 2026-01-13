import React, { useEffect, useState } from "react";

const journeySlides = [
  {
    id: 1,
    step: "Step 1 · Explore",
    title: "Discover What You Want to Learn",
    description:
      "Browse curated tracks and categories to find skills that match your goals – from web dev to data science.",
    image: "https://pplx-res.cloudinary.com/image/upload/v1766297893/search_images/5d954f2dabcd24e3ad26eec2995ab330f919106d.jpg",
  },
  {
    id: 2,
    step: "Step 2 · Start Small",
    title: "Begin With Short, Focused Lessons",
    description:
      "Learn in small chunks that fit your day. Finish modules in 20–30 minutes without feeling overwhelmed.",
    image: "https://pplx-res.cloudinary.com/image/upload/v1766297895/search_images/4c3728e8969a130161ad08a21ee805134026aa0f.jpg",
  },
  {
    id: 3,
    step: "Step 3 · Practice & Projects",
    title: "Apply What You Learn",
    description:
      "Build mini-projects, solve quizzes, and apply concepts so the knowledge actually sticks.",
    image: "https://pplx-res.cloudinary.com/image/upload/v1766297894/search_images/91af4287acfada131cacbe17ebd5aa32ec08c148.jpg",
  },
  {
    id: 4,
    step: "Step 4 · Track Progress",
    title: "See Your Growth Over Time",
    description:
      "Track completed lessons, streaks, and skills so you always know where you stand.",
    image: "https://pplx-res.cloudinary.com/image/upload/v1763732311/search_images/90d8b0f3a38b6f69604330a96044271919e5ba53.jpg",
  },
];

const SLIDE_INTERVAL = 6000;

const LearningJourney = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % journeySlides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const activeSlide = journeySlides[activeIndex];

  return (
    <section className="bg-white dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-800 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Your Learning Journey, Visualized
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See how a typical learner moves from curiosity to job-ready skills with small, consistent steps.
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="grid md:grid-cols-2 gap-0 items-stretch">
            {/* Image side */}
            <div className="relative min-h-[220px] md:min-h-[260px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5A4BDA]/10 to-transparent dark:from-[#5A4BDA]/20" />
              {activeSlide.image && (
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="h-full w-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                />
              )}
            </div>

            {/* Text side */}
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#5A4BDA] mb-2">
                {activeSlide.step}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {activeSlide.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                {activeSlide.description}
              </p>

              {/* Progress dots */}
              <div className="flex items-center gap-2 mt-2">
                {journeySlides.map((slide, idx) => (
                  <span
                    key={slide.id}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? "w-6 bg-[#5A4BDA]"
                        : "w-2 bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningJourney;
