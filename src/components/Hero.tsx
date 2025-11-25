import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import AnshikaOS from "./AnshikaOS";
import { getHeroData } from "@/lib/sanity-queries";
import type { HeroData } from "@/types/sanity";

const Hero = () => {
  const [iosOpen, setIosOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true);
    
    // Fetch hero data from Sanity
    const fetchHeroData = async () => {
      try {
        const data = await getHeroData();
        setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHeroData();
  }, []);

  // Show loading state while fetching data
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5c1a1a] via-[#78201B] to-[#3d0f0d]">
        <div className="text-[#F8EDEA] text-2xl">Loading...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#5c1a1a] via-[#78201B] to-[#3d0f0d]">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-10 noise pointer-events-none"></div>

      <div className="w-full relative z-10 flex flex-col items-center justify-center min-h-screen py-8 md:py-12 px-4 md:px-6">
        {/* Experience badge positioned above Portfolio text */}
        <div className={`mb-6 md:mb-8 lg:mb-12 transition-all duration-[800ms] ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="inline-block bg-[#78201B] text-[#F8EDEA] px-5 md:px-8 py-2 md:py-3 rounded-full text-xs md:text-sm lg:text-base font-bold border-2 border-[#F8EDEA]/30 shadow-lg">
            {heroData?.experienceBadge || '+6 YEARS'}
          </span>
        </div>

        {/* Main Portfolio typography - centered and stacked */}
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Background decorative text layer - behind main text */}
          <div className="absolute inset-0 pointer-events-none">
            {/* @2026 Anwarei - positioned on left side */}
            <div className={`hidden md:block absolute top-[40%] left-[5%] lg:left-[10%] -z-10 transition-all duration-[800ms] ease-out delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}>
              <p className="text-sm lg:text-base text-[#F8EDEA]/35 mb-1">
                <span className="italic font-serif">@{heroData?.metadata?.year || '2026'}</span>
              </p>
              <p className="text-sm lg:text-base text-[#F8EDEA]/35">
                <span className="italic font-serif">{heroData?.metadata?.copyright || 'Anwarei'}</span>
              </p>
            </div>

            {/* Subtitle positioned on the right side */}
            <div className={`hidden xl:block absolute top-[20%] right-[2%] 2xl:right-[5%] text-right -z-10 transition-all duration-[800ms] ease-out delay-250 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}>
              <p className="text-xs text-[#F8EDEA]/40 mb-0.5">
                {heroData?.subtitle?.line1 || 'A Visual Portfolio'}
              </p>
              <p className="text-xs text-[#F8EDEA]/40">
                {heroData?.subtitle?.line2 || 'Reflecting a Complete Creative Path'}
              </p>
            </div>
          </div>

          {/* Main Portfolio text - on top with advanced animations */}
          <div className="relative z-10 text-center px-2">
            <h1 className="text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] xl:text-[12vw] font-black leading-[0.85] text-[#F8EDEA] tracking-tight uppercase">
              {/* PORT with letter animation */}
              <span className="inline-block">
                {(heroData?.portfolioTitle?.line1 || 'Port').split('').map((letter, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-700 ease-out hover:scale-110 hover:text-[#D4A574] cursor-default ${
                      isVisible 
                        ? 'opacity-100 translate-y-0 rotate-0' 
                        : 'opacity-0 translate-y-20 -rotate-12'
                    }`}
                    style={{ 
                      transitionDelay: `${100 + index * 100}ms`,
                      display: 'inline-block',
                      animation: isVisible ? `float ${3 + index * 0.2}s ease-in-out infinite` : 'none',
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
              
              {/* FOLIO with letter animation */}
              <span className="block">
                {(heroData?.portfolioTitle?.line2 || 'folio').split('').map((letter, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-700 ease-out hover:scale-110 hover:text-[#D4A574] cursor-default ${
                      isVisible 
                        ? 'opacity-100 translate-y-0 rotate-0' 
                        : 'opacity-0 translate-y-20 rotate-12'
                    }`}
                    style={{ 
                      transitionDelay: `${500 + index * 100}ms`,
                      display: 'inline-block',
                      animation: isVisible ? `float ${3 + index * 0.2}s ease-in-out infinite` : 'none',
                      animationDelay: `${0.5 + index * 0.1}s`
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </h1>
          </div>
        </div>

        {/* Mobile subtitle - shown only on small screens */}
        <div className={`md:hidden mt-6 text-center transition-all duration-[800ms] ease-out delay-200 px-4 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-xs md:text-sm text-[#F8EDEA]/50 mb-2">
            <span className="italic font-serif">@{heroData?.metadata?.year || '2026'} {heroData?.metadata?.copyright || 'Anwarei'}</span>
          </p>
          <p className="text-xs md:text-sm text-[#F8EDEA]/50">
            {heroData?.subtitle?.line1 || 'A Visual Portfolio'}
          </p>
          <p className="text-xs md:text-sm text-[#F8EDEA]/50">
            {heroData?.subtitle?.line2 || 'Reflecting a Complete Creative Path'}
          </p>
        </div>

        {/* Open AnshikaOS button - positioned below */}
        <div className={`mt-8 md:mt-12 lg:mt-16 transition-all duration-[800ms] ease-out delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button
            onClick={() => setIosOpen(true)}
            className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-2.5 md:py-3 bg-transparent text-[#F8EDEA] font-bold text-sm md:text-base lg:text-lg border-2 border-[#F8EDEA]/40 hover:bg-[#F8EDEA]/10 hover:border-[#F8EDEA]/60 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#D4A574] active:scale-95"
            aria-label={heroData?.ctaButton?.text || "Open AnshikaOS interface"}
          >
            <Icon icon="fluent:grid-dots-28-filled" className="text-xl md:text-2xl" />
            <span>{heroData?.ctaButton?.text || 'Open AnshikaOS'}</span>
          </button>
        </div>

        {/* Bottom metadata with line separator */}
        <div className={`absolute bottom-4 md:bottom-6 lg:bottom-8 left-4 md:left-6 lg:left-12 right-4 md:right-6 lg:right-12 flex justify-between items-center text-[#F8EDEA]/30 text-[10px] md:text-xs transition-all duration-[800ms] ease-out delay-350 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <span className="truncate">{heroData?.metadata?.copyright || 'Anshika Mishra'} Portfolio</span>
          <span className="border-t border-[#F8EDEA]/20 flex-1 mx-2 md:mx-4 lg:mx-8"></span>
          <span>{heroData?.metadata?.year || '2026'}</span>
        </div>
      </div>

      {/* AnshikaOS */}
      <AnshikaOS open={iosOpen} onClose={() => setIosOpen(false)} />
    </section>
  );
};

export default Hero;
