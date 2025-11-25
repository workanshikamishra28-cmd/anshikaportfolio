import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import AnshikaOS from "./AnshikaOS";
import { getHeroData } from "@/lib/sanity-queries";
import type { HeroData } from "@/types/sanity";

const HeroWithSanity = () => {
  const [iosOpen, setIosOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    setIsVisible(true);
  }, []);

  if (loading || !heroData) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5c1a1a] via-[#78201B] to-[#3d0f0d]">
        <div className="text-[#F8EDEA] text-2xl">Loading...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#5c1a1a] via-[#78201B] to-[#3d0f0d]">
      <div className="absolute inset-0 opacity-10 noise pointer-events-none"></div>

      <div className="w-full relative z-10 flex flex-col items-center justify-center min-h-screen py-12 px-6">
        {/* Experience badge */}
        <div className={`mb-8 md:mb-12 transition-all duration-[800ms] ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="inline-block bg-[#78201B] text-[#F8EDEA] px-8 py-3 rounded-full text-sm md:text-base font-bold border-2 border-[#F8EDEA]/30 shadow-lg">
            {heroData.experienceBadge}
          </span>
        </div>

        {/* Main Portfolio typography */}
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Background decorative text layer */}
          <div className="absolute inset-0 pointer-events-none">
            <div className={`hidden md:block absolute top-[40%] left-[5%] lg:left-[10%] -z-10 transition-all duration-[800ms] ease-out delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}>
              <p className="text-sm lg:text-base text-[#F8EDEA]/35 mb-1">
                <span className="italic font-serif">@{heroData.metadata.year}</span>
              </p>
              <p className="text-sm lg:text-base text-[#F8EDEA]/35">
                <span className="italic font-serif">{heroData.metadata.copyright}</span>
              </p>
            </div>

            <div className={`hidden xl:block absolute top-[20%] right-[2%] 2xl:right-[5%] text-right -z-10 transition-all duration-[800ms] ease-out delay-250 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}>
              <p className="text-xs text-[#F8EDEA]/40 mb-0.5">{heroData.subtitle.line1}</p>
              <p className="text-xs text-[#F8EDEA]/40">{heroData.subtitle.line2}</p>
            </div>
          </div>

          {/* Main Portfolio text */}
          <div className="relative z-10 text-center">
            <h1 className="text-[24vw] sm:text-[22vw] md:text-[20vw] lg:text-[18vw] xl:text-[16vw] font-black leading-[0.85] text-[#F8EDEA] tracking-tight uppercase">
              <span className="inline-block">
                {heroData.portfolioTitle.line1.split('').map((letter, index) => (
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
              
              <span className="block">
                {heroData.portfolioTitle.line2.split('').map((letter, index) => (
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

        {/* Mobile subtitle */}
        <div className={`md:hidden mt-8 text-center transition-all duration-[800ms] ease-out delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-sm text-[#F8EDEA]/50 mb-2">
            <span className="italic font-serif">@{heroData.metadata.year} {heroData.metadata.copyright}</span>
          </p>
          <p className="text-sm text-[#F8EDEA]/50">{heroData.subtitle.line1}</p>
          <p className="text-sm text-[#F8EDEA]/50">{heroData.subtitle.line2}</p>
        </div>

        {/* CTA button */}
        <div className={`mt-12 md:mt-16 transition-all duration-[800ms] ease-out delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button
            onClick={() => setIosOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-3 bg-transparent text-[#F8EDEA] font-bold text-base md:text-lg border-2 border-[#F8EDEA]/40 hover:bg-[#F8EDEA]/10 hover:border-[#F8EDEA]/60 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#D4A574]"
            aria-label={heroData.ctaButton.text}
          >
            <Icon icon="fluent:grid-dots-28-filled" className="text-2xl" />
            <span>{heroData.ctaButton.text}</span>
          </button>
        </div>

        {/* Bottom metadata */}
        <div className={`absolute bottom-6 md:bottom-8 left-6 md:left-12 right-6 md:right-12 flex justify-between items-center text-[#F8EDEA]/30 text-xs transition-all duration-[800ms] ease-out delay-350 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <span>{heroData.metadata.copyright} Portfolio</span>
          <span className="border-t border-[#F8EDEA]/20 flex-1 mx-4 md:mx-8"></span>
          <span>{heroData.metadata.year}</span>
        </div>
      </div>

      <AnshikaOS open={iosOpen} onClose={() => setIosOpen(false)} />
    </section>
  );
};

export default HeroWithSanity;
