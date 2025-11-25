import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import AnshikaOS from "./AnshikaOS";
import { getHeroData } from "@/lib/sanity-queries";
import type { HeroData } from "@/types/sanity";
import { ScrollProgressBar, FloatingShapes, SpotlightCursor } from "./StorytellingAnimations";

/**
 * Enhanced Hero Section with Advanced Storytelling Animations
 * Features:
 * - Letter-by-letter reveal with 3D transforms
 * - Floating animation on each character
 * - Parallax background layers
 * - Spotlight cursor effect
 * - Scroll progress indicator
 * - Floating decorative shapes
 */

const HeroEnhanced = () => {
  const [iosOpen, setIosOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    // Track mouse position for parallax effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Show loading state while fetching data
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5c1a1a] via-[#78201B] to-[#3d0f0d]">
        <div className="text-[#F8EDEA] text-2xl animate-pulse">Loading...</div>
      </section>
    );
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />
      
      {/* Spotlight Cursor Effect */}
      <SpotlightCursor />

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#5c1a1a] via-[#78201B] to-[#3d0f0d]">
        {/* Animated background layers */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <FloatingShapes count={8} />
        </div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-10 noise pointer-events-none"></div>

        {/* Radial gradient overlay for depth */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
          }}
        />

        <div className="w-full relative z-10 flex flex-col items-center justify-center min-h-screen py-12 px-6">
          {/* Experience badge with enhanced animation */}
          <div className={`mb-8 md:mb-12 transition-all duration-[1000ms] ease-out ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'
          }`}>
            <div className="relative group">
              <span className="inline-block bg-[#78201B] text-[#F8EDEA] px-8 py-3 rounded-full text-sm md:text-base font-bold border-2 border-[#F8EDEA]/30 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-default">
                {heroData?.experienceBadge || '+6 YEARS'}
              </span>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-[#D4A574]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
          </div>

          {/* Main Portfolio typography - centered and stacked */}
          <div className="relative w-full max-w-7xl mx-auto">
            {/* Background decorative text layer - behind main text with parallax */}
            <div className="absolute inset-0 pointer-events-none">
              {/* @2026 Anwarei - positioned on left side with parallax */}
              <div 
                className={`hidden md:block absolute top-[40%] left-[5%] lg:left-[10%] -z-10 transition-all duration-[1000ms] ease-out delay-200 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{
                  transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
                }}
              >
                <p className="text-sm lg:text-base text-[#F8EDEA]/35 mb-1">
                  <span className="italic font-serif">@{heroData?.metadata?.year || '2026'}</span>
                </p>
                <p className="text-sm lg:text-base text-[#F8EDEA]/35">
                  <span className="italic font-serif">{heroData?.metadata?.copyright || 'Anwarei'}</span>
                </p>
              </div>

              {/* Subtitle positioned on the right side with parallax */}
              <div 
                className={`hidden xl:block absolute top-[20%] right-[2%] 2xl:right-[5%] text-right -z-10 transition-all duration-[1000ms] ease-out delay-250 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                style={{
                  transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * 0.3}px)`,
                }}
              >
                <p className="text-xs text-[#F8EDEA]/40 mb-0.5">
                  {heroData?.subtitle?.line1 || 'A Visual Portfolio'}
                </p>
                <p className="text-xs text-[#F8EDEA]/40">
                  {heroData?.subtitle?.line2 || 'Reflecting a Complete Creative Path'}
                </p>
              </div>
            </div>

            {/* Main Portfolio text - on top with advanced 3D animations */}
            <div className="relative z-10 text-center transform-3d">
              <h1 className="text-[24vw] sm:text-[22vw] md:text-[20vw] lg:text-[18vw] xl:text-[16vw] font-black leading-[0.85] text-[#F8EDEA] tracking-tight uppercase">
                {/* PORT with enhanced letter animation */}
                <span className="inline-block">
                  {(heroData?.portfolioTitle?.line1 || 'Port').split('').map((letter, index) => (
                    <span
                      key={index}
                      className={`inline-block transition-all duration-[900ms] ease-out hover:scale-110 hover:text-[#D4A574] cursor-default backface-hidden ${
                        isVisible 
                          ? 'opacity-100 translate-y-0 rotate-0' 
                          : 'opacity-0 translate-y-20 -rotate-12'
                      }`}
                      style={{ 
                        transitionDelay: `${100 + index * 120}ms`,
                        display: 'inline-block',
                        animation: isVisible ? `float ${3 + index * 0.2}s ease-in-out infinite` : 'none',
                        animationDelay: `${index * 0.1}s`,
                        textShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        filter: 'drop-shadow(0 0 20px rgba(212, 165, 116, 0.3))',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.15) rotateY(10deg)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) rotateY(0deg)';
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                
                {/* FOLIO with enhanced letter animation */}
                <span className="block">
                  {(heroData?.portfolioTitle?.line2 || 'folio').split('').map((letter, index) => (
                    <span
                      key={index}
                      className={`inline-block transition-all duration-[900ms] ease-out hover:scale-110 hover:text-[#D4A574] cursor-default backface-hidden ${
                        isVisible 
                          ? 'opacity-100 translate-y-0 rotate-0' 
                          : 'opacity-0 translate-y-20 rotate-12'
                      }`}
                      style={{ 
                        transitionDelay: `${600 + index * 120}ms`,
                        display: 'inline-block',
                        animation: isVisible ? `float ${3 + index * 0.2}s ease-in-out infinite` : 'none',
                        animationDelay: `${0.6 + index * 0.1}s`,
                        textShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        filter: 'drop-shadow(0 0 20px rgba(212, 165, 116, 0.3))',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.15) rotateY(-10deg)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) rotateY(0deg)';
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
          <div className={`md:hidden mt-8 text-center transition-all duration-[1000ms] ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-sm text-[#F8EDEA]/50 mb-2">
              <span className="italic font-serif">@{heroData?.metadata?.year || '2026'} {heroData?.metadata?.copyright || 'Anwarei'}</span>
            </p>
            <p className="text-sm text-[#F8EDEA]/50">
              {heroData?.subtitle?.line1 || 'A Visual Portfolio'}
            </p>
            <p className="text-sm text-[#F8EDEA]/50">
              {heroData?.subtitle?.line2 || 'Reflecting a Complete Creative Path'}
            </p>
          </div>

          {/* Open AnshikaOS button - enhanced with ripple effect */}
          <div className={`mt-12 md:mt-16 transition-all duration-[1000ms] ease-out delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button
              onClick={() => setIosOpen(true)}
              className="group relative inline-flex items-center gap-3 px-8 py-3 bg-transparent text-[#F8EDEA] font-bold text-base md:text-lg border-2 border-[#F8EDEA]/40 hover:bg-[#F8EDEA]/10 hover:border-[#F8EDEA]/60 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#D4A574] overflow-hidden"
              aria-label={heroData?.ctaButton?.text || "Open AnshikaOS interface"}
            >
              {/* Animated background on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#D4A574]/0 via-[#D4A574]/20 to-[#D4A574]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <span className="relative text-xl group-hover:scale-110 transition-transform duration-300">
                <Icon icon="fluent:grid-dots-28-filled" className="text-2xl" />
              </span>
              <span className="relative">{heroData?.ctaButton?.text || 'Open AnshikaOS'}</span>
              
              {/* Arrow animation */}
              <span className="relative ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </div>

          {/* Bottom metadata with line separator and enhanced animation */}
          <div className={`absolute bottom-6 md:bottom-8 left-6 md:left-12 right-6 md:right-12 flex justify-between items-center text-[#F8EDEA]/30 text-xs transition-all duration-[1000ms] ease-out delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <span className="hover:text-[#F8EDEA]/50 transition-colors duration-300">
              {heroData?.metadata?.copyright || 'Anshika Mishra'} Portfolio
            </span>
            <span className="border-t border-[#F8EDEA]/20 flex-1 mx-4 md:mx-8 relative overflow-hidden">
              {/* Animated line fill on load */}
              <span 
                className="absolute inset-0 border-t-2 border-[#D4A574]/40"
                style={{
                  animation: isVisible ? 'slideRight 2s ease-out forwards' : 'none',
                  animationDelay: '1s',
                }}
              />
            </span>
            <span className="hover:text-[#F8EDEA]/50 transition-colors duration-300">
              {heroData?.metadata?.year || '2026'}
            </span>
          </div>

          {/* Scroll indicator */}
          <div className={`absolute bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 transition-all duration-[1000ms] ease-out delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="flex flex-col items-center gap-2 text-[#F8EDEA]/40 animate-bounce">
              <span className="text-xs uppercase tracking-wider">Scroll</span>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="animate-pulse"
              >
                <path 
                  d="M10 3L10 17M10 17L3 10M10 17L17 10" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* AnshikaOS */}
        <AnshikaOS open={iosOpen} onClose={() => setIosOpen(false)} />
      </section>
    </>
  );
};

export default HeroEnhanced;
