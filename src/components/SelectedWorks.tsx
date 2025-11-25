import React, { useEffect, useRef, useState } from "react";
import { getSelectedWorks } from "@/lib/sanity-queries";
import { urlFor } from "@/lib/sanity";
import type { SelectedWork } from "@/types/sanity";
import { FloatingShapes } from "./StorytellingAnimations";

const SelectedWorks: React.FC = () => {
  const [works, setWorks] = useState<SelectedWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Fetch selected works from Sanity
    const fetchWorks = async () => {
      try {
        const data = await getSelectedWorks();
        setWorks(data);
      } catch (error) {
        console.error('Error fetching selected works:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();

    // Intersection observer for section visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (works.length <= 1) return;

    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [works.length, currentIndex]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % works.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + works.length) % works.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 md:px-6 lg:px-12 bg-gradient-to-br from-[#5c1a1a] via-[#78201B] to-[#3d0f0d] overflow-hidden"
    >
      {/* Animated background elements */}
      <FloatingShapes count={8} className="opacity-15" />

      {/* Grid background pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(to right, #F8EDEA 1px, transparent 1px),
          linear-gradient(to bottom, #F8EDEA 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}></div>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-10 noise pointer-events-none"></div>

      {/* Marquee at the top */}
      <div className="absolute top-0 left-0 right-0 bg-[#78201B] border-y-2 border-[#F8EDEA]/20 py-2 md:py-4 overflow-hidden z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-[#F8EDEA] mx-4 md:mx-8 hover:text-[#D4A574] transition-colors duration-300 cursor-default">
              work showcase
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 mt-12 md:mt-16">
        {/* Section header with animations */}
        <div className={`mb-8 md:mb-12 text-center transition-all duration-[800ms] ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-[#F8EDEA] mb-3 md:mb-4">
            {/* Animated letters */}
            {'Selected Works'.split('').map((letter, index) => (
              <span
                key={index}
                className="inline-block hover:text-[#D4A574] hover:scale-110 transition-all duration-300 cursor-default"
                style={{
                  animation: isVisible ? `fadeInUp 0.6s ease-out forwards` : 'none',
                  animationDelay: `${index * 40}ms`,
                  opacity: isVisible ? 1 : 0,
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </h2>
          <p 
            className="text-sm md:text-xl text-[#F8EDEA]/70 px-4"
            style={{
              animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
              animationDelay: '600ms',
              opacity: isVisible ? 1 : 0,
            }}
          >
            Curated projects that showcase my design journey
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12 md:py-20">
            <div className="text-[#F8EDEA] text-lg md:text-2xl animate-pulse">Loading works...</div>
          </div>
        ) : (
          /* Carousel Container */
          <div className="relative">
            {/* Carousel Wrapper */}
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
              {/* Slides */}
              <div className="relative" style={{ minHeight: '500px' }}>
                {works.map((work, index) => {
                  const isActive = index === currentIndex;
                  const isPrev = index === (currentIndex - 1 + works.length) % works.length;
                  const isNext = index === (currentIndex + 1) % works.length;
                  
                  let transform = 'translateX(100%)';
                  let opacity = 0;
                  let zIndex = 0;
                  
                  if (isActive) {
                    transform = 'translateX(0)';
                    opacity = 1;
                    zIndex = 10;
                  } else if (isPrev) {
                    transform = 'translateX(-100%)';
                    opacity = 0;
                    zIndex = 5;
                  }
                  
                  return (
                    <div
                      key={work._id}
                      className="absolute inset-0 transition-all duration-700 ease-out"
                      style={{
                        transform,
                        opacity,
                        zIndex,
                      }}
                    >
                      <div 
                        className="group rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl h-full"
                        style={{ backgroundColor: work.backgroundColor }}
                      >
                        <div className="grid md:grid-cols-2 gap-0 h-full min-h-[500px] md:min-h-[600px]">
                          {/* Text content */}
                          <div className={`p-8 md:p-12 lg:p-16 flex flex-col justify-center ${
                            work.backgroundColor === "#F8EDEA" || work.backgroundColor === "#10B981" 
                              ? 'text-[#78201B]' 
                              : 'text-[#F8EDEA]'
                          }`}>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                              {work.title}
                            </h3>
                            <p className={`text-base md:text-xl mb-6 md:mb-8 leading-relaxed ${
                              work.backgroundColor === "#F8EDEA" || work.backgroundColor === "#10B981"
                                ? 'text-[#78201B]/80'
                                : 'text-[#F8EDEA]/80'
                            }`}>
                              {work.description}
                            </p>
                            <button 
                              className={`inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg transition-all duration-300 w-fit hover:scale-105 hover:gap-5 active:scale-95 ${
                                work.backgroundColor === "#F8EDEA" || work.backgroundColor === "#10B981"
                                  ? 'bg-[#78201B] text-[#F8EDEA] hover:bg-[#5c1a1a]'
                                  : 'bg-[#F8EDEA] text-[#78201B] hover:bg-white'
                              }`}
                            >
                              <span>View Project</span>
                              <span className="text-xl">→</span>
                            </button>
                          </div>

                          {/* Image */}
                          <div className="min-h-[300px] md:min-h-0 bg-black/10 flex items-center justify-center p-8 md:p-12 relative overflow-hidden">
                            {work.image ? (
                              <img
                                src={urlFor(work.image).width(1200).url()}
                                alt={work.image.alt || work.title}
                                className="w-full h-full object-cover rounded-2xl"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm min-h-[350px]">
                                <div className="text-center">
                                  <div className={`text-8xl mb-6 ${
                                    work.backgroundColor === "#F8EDEA" || work.backgroundColor === "#10B981"
                                      ? 'text-[#78201B]/40'
                                      : 'text-[#F8EDEA]/40'
                                  }`}>
                                    {index % 4 === 0 ? '✦' : index % 4 === 1 ? '★' : index % 4 === 2 ? '◆' : '●'}
                                  </div>
                                  <p className={`text-lg ${
                                    work.backgroundColor === "#F8EDEA" || work.backgroundColor === "#10B981"
                                      ? 'text-[#78201B]/60'
                                      : 'text-[#F8EDEA]/60'
                                  }`}>
                                    Project Preview
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Arrows */}
            {works.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  disabled={isTransitioning}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-[#F8EDEA]/90 hover:bg-[#F8EDEA] text-[#78201B] p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isTransitioning}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[#F8EDEA]/90 hover:bg-[#F8EDEA] text-[#78201B] p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next slide"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Dots Navigation */}
            {works.length > 1 && (
              <div className="flex justify-center gap-2 md:gap-3 mt-8">
                {works.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    disabled={isTransitioning}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? 'bg-[#D4A574] w-8 md:w-12 h-3 md:h-4'
                        : 'bg-[#F8EDEA]/30 hover:bg-[#F8EDEA]/50 w-3 md:w-4 h-3 md:h-4'
                    } disabled:cursor-not-allowed`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Slide Counter */}
            {works.length > 1 && (
              <div className="text-center mt-4 text-[#F8EDEA]/60 text-sm md:text-base font-medium">
                {currentIndex + 1} / {works.length}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SelectedWorks;
