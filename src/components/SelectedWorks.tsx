import React, { useEffect, useRef, useState } from "react";
import { getSelectedWorks } from "@/lib/sanity-queries";
import { urlFor } from "@/lib/sanity";
import type { SelectedWork } from "@/types/sanity";
import { FloatingShapes } from "./StorytellingAnimations";

const SelectedWorks: React.FC = () => {
  const [cardPositions, setCardPositions] = useState<number[]>([]);
  const [works, setWorks] = useState<SelectedWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const newPositions = cardRefs.current.map((card, index) => {
        if (!card || index === 0) return 0; // First card doesn't move
        
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top;
        
        // Calculate when this card should start stacking
        // Each card starts stacking when it reaches its designated position
        const stackPosition = 100 + (index * 60); // Stack position for this card
        
        if (cardTop <= stackPosition) {
          // Card should be stacked
          return 1; // Fully stacked
        }
        
        // Calculate progress towards stacking (for smooth animation)
        const distanceToStack = cardTop - stackPosition;
        const animationDistance = 200; // Distance over which animation happens
        
        if (distanceToStack < animationDistance) {
          return 1 - (distanceToStack / animationDistance);
        }
        
        return 0; // Not yet stacking
      });
      
      setCardPositions(newPositions);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [works.length]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 md:py-20 lg:py-32 px-4 md:px-6 lg:px-12 bg-gradient-to-br from-[#5c1a1a] via-[#78201B] to-[#3d0f0d] overflow-hidden"
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

      <div className="max-w-6xl mx-auto relative z-10 mt-12 md:mt-16 lg:mt-20">
        {/* Section header with animations */}
        <div className={`mb-10 md:mb-16 text-center transition-all duration-[800ms] ease-out ${
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
            <div className="text-[#F8EDEA] text-lg md:text-2xl">Loading works...</div>
          </div>
        ) : (
          /* Stacked cards with stacking animation */
          <div className="relative" style={{ minHeight: `${works.length * (window.innerWidth < 768 ? 700 : 1000)}px` }}>
            {works.map((work, index) => {
            const stackProgress = cardPositions[index] || 0;
            const isMobile = window.innerWidth < 768;
            const scale = 1 - (index * (isMobile ? 0.02 : 0.03) * (1 - stackProgress)); // Scale changes as it stacks
            const zIndex = works.length - index;
            const stackOffset = index * (isMobile ? 40 : 60); // Vertical offset when stacked
            
            // Calculate position: starts below, moves up to stack position
            const topPosition = index === 0 
              ? (isMobile ? 60 : 100) // First card stays at fixed position
              : (isMobile ? 60 : 100) + stackOffset + ((1 - stackProgress) * (isMobile ? 400 : 600)); // Others slide up
            
            return (
              <div
                key={work._id}
                ref={(el) => (cardRefs.current[index] = el)}
                className="sticky w-full transition-all duration-300 ease-out"
                style={{
                  top: `${topPosition}px`,
                  zIndex,
                  marginBottom: index < works.length - 1 ? (isMobile ? '500px' : '800px') : '0',
                }}
              >
                <div 
                  className="group rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl md:hover:shadow-3xl transition-all duration-500 md:hover:scale-[1.02] mx-auto relative"
                  style={{ 
                    backgroundColor: work.backgroundColor,
                    transform: `scale(${scale})`,
                    maxWidth: '1200px',
                  }}
                >
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] md:group-hover:translate-x-[100%] transition-transform duration-1000 ease-out z-10 pointer-events-none" />
                  
                  <div className="grid md:grid-cols-2 gap-0 min-h-[400px] md:min-h-[500px]">
                    {/* Text content with enhanced animations */}
                    <div className={`p-6 md:p-10 lg:p-16 flex flex-col justify-center relative z-20 ${
                      work.backgroundColor === "#F8EDEA" || work.backgroundColor === "#10B981" 
                        ? 'text-[#78201B]' 
                        : 'text-[#F8EDEA]'
                    }`}>
                      <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight md:group-hover:scale-105 transition-transform duration-500 origin-left">
                        {work.title}
                      </h3>
                      <p className={`text-sm md:text-xl mb-6 md:mb-8 leading-relaxed md:group-hover:translate-x-2 transition-transform duration-500 ${
                        work.backgroundColor === "#F8EDEA" || work.backgroundColor === "#10B981"
                          ? 'text-[#78201B]/80'
                          : 'text-[#F8EDEA]/80'
                      }`}>
                        {work.description}
                      </p>
                      <button 
                        className={`inline-flex items-center gap-2 md:gap-3 px-5 md:px-8 py-2.5 md:py-4 rounded-full font-bold text-sm md:text-lg transition-all duration-300 w-fit md:hover:scale-105 md:hover:gap-5 active:scale-95 relative overflow-hidden ${
                          work.backgroundColor === "#F8EDEA" || work.backgroundColor === "#10B981"
                            ? 'bg-[#78201B] text-[#F8EDEA] hover:bg-[#5c1a1a]'
                            : 'bg-[#F8EDEA] text-[#78201B] hover:bg-white'
                        }`}
                      >
                        <span className="relative z-10">View Project</span>
                        <span className="text-lg md:text-2xl relative z-10 md:group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </button>
                    </div>

                    {/* Image with enhanced effects */}
                    <div className="min-h-[250px] md:min-h-[400px] lg:min-h-0 bg-black/10 flex items-center justify-center p-6 md:p-10 lg:p-12 relative overflow-hidden">
                      {work.image ? (
                        <>
                          <img
                            src={urlFor(work.image).width(1200).url()}
                            alt={work.image.alt || work.title}
                            className="w-full h-full object-cover rounded-2xl group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                          />
                          {/* Gradient overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl m-10 md:m-12" />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm min-h-[350px] group-hover:bg-white/20 transition-colors duration-500">
                          <div className="text-center">
                            <div className={`text-8xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ${
                              work.backgroundColor === "#F8EDEA" || work.backgroundColor === "#10B981"
                                ? 'text-[#78201B]/40 group-hover:text-[#78201B]/60'
                                : 'text-[#F8EDEA]/40 group-hover:text-[#F8EDEA]/60'
                            }`}>
                              {index % 4 === 0 ? '✦' : index % 4 === 1 ? '★' : index % 4 === 2 ? '◆' : '●'}
                            </div>
                            <p className={`text-lg transition-colors duration-500 ${
                              work.backgroundColor === "#F8EDEA" || work.backgroundColor === "#10B981"
                                ? 'text-[#78201B]/60 group-hover:text-[#78201B]/80'
                                : 'text-[#F8EDEA]/60 group-hover:text-[#F8EDEA]/80'
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
        )}
      </div>
    </section>
  );
};

export default SelectedWorks;
