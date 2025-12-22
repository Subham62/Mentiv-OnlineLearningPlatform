import React, { useEffect, useState } from "react";
import { ArrowRight, BookOpen, GraduationCap, TrendingUp, Clock, Award, Zap, Layers } from "lucide-react";

const slides = [
  {
    id: 1,
    badge: " New · Web Development",
    title: "Become a Full-Stack Developer",
    description:
      "Master frontend and backend with real-world projects and land your dream tech job.",
    gradient: "from-violet-600 via-indigo-500 to-blue-500",
    icon: <BookOpen className="w-8 h-8" />,
    stats: { 
      label1: "40+ Hours", 
      label2: "Hands-On Learning",
      icon1: <Clock className="w-4 h-4" />,
      icon2: <Layers className="w-4 h-4"/>
    }
  },
  {
    id: 2,
    badge: " Career Boost",
    title: "Crack Your Next Placement",
    description:
      "Structured DSA, system design, and mock interviews tailored for tech roles.",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    icon: <TrendingUp className="w-8 h-8" />,
    stats: { 
      label1: "100+ Problems", 
      label2: "Interview Ready",
      icon1: <Zap className="w-4 h-4" />,
      icon2: <Award className="w-4 h-4" />
    }
  },
  {
    id: 3,
    badge: " For Students",
    title: "Learn Anytime, Anywhere",
    description:
      "Short, crisp lessons designed to fit your college schedule and exams.",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
    icon: <GraduationCap className="w-8 h-8" />,
    stats: { 
      label1: "Lifetime Access", 
      label2: "Mobile & Web",
      icon1: <Award className="w-4 h-4" />,
      icon2: <Zap className="w-4 h-4" />
    }
  },
];

const SLIDE_INTERVAL = 5000;

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <section className="relative overflow-hidden h-full">
      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${activeSlide.gradient} transition-all duration-1000 ease-in-out`}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.4)_1px,_transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative h-full flex items-center px-6 sm:px-8 lg:px-12 py-8">
        <div className="w-full space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 border border-white/30">
            <span className="text-xs font-semibold text-white uppercase tracking-wide">
              {activeSlide.badge}
            </span>
          </div>

          {/* Icon */}
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
            <div className="text-white">
              {activeSlide.icon}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight max-w-lg">
            {activeSlide.title}
          </h2>

          {/* Description */}
          <p className="text-base text-white/90 max-w-md leading-relaxed">
            {activeSlide.description}
          </p>

          {/* Stats - Updated to show course features */}
          <div className="flex items-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                {activeSlide.stats.icon1}
              </div>
              <div>
                <p className="text-xs font-bold">{activeSlide.stats.label1}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                {activeSlide.stats.icon2}
              </div>
              <div>
                <p className="text-xs font-bold">{activeSlide.stats.label2}</p>
              </div>
            </div>
          </div>

          {/* Slider Dots */}
          <div className="flex items-center gap-2 pt-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
