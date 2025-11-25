import { useEffect, useRef, useState } from 'react';
import { getAboutData } from '@/lib/sanity-queries';
import { urlFor } from '@/lib/sanity';
import type { AboutData } from '@/types/sanity';
import { FloatingShapes, MorphingBlob } from './StorytellingAnimations';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Fetch about data from Sanity
    const fetchAboutData = async () => {
      try {
        const data = await getAboutData();
        setAboutData(data);
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Mouse move for parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-20 lg:py-32 px-4 md:px-6 lg:px-12 relative bg-gradient-to-br from-[#5c1a1a] via-[#78201B] to-[#3d0f0d] overflow-hidden"
    >
      {/* Animated background elements */}
      <FloatingShapes count={6} className="opacity-20" />
      <MorphingBlob color="#D4A574" className="absolute top-20 right-10 w-96 h-96 opacity-10" />
      <MorphingBlob color="#F8EDEA" className="absolute bottom-20 left-10 w-64 h-64 opacity-5" />

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-10 noise pointer-events-none"></div>

      {/* Marquee at the top */}
      <div className="absolute top-0 left-0 right-0 bg-[#78201B] border-y-2 border-[#F8EDEA]/20 py-2 md:py-4 overflow-hidden z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-[#F8EDEA] mx-4 md:mx-8">
              {aboutData?.marqueeText || 'about me'}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 mt-12 md:mt-16 lg:mt-20">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Left side - Heading and Content */}
          <div 
            className={`space-y-6 md:space-y-8 transition-all duration-[800ms] ease-out ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Main Heading with enhanced animations */}
            {loading ? (
              <div className="text-[#F8EDEA] animate-pulse">Loading...</div>
            ) : (
              <>
                <div className="space-y-3 md:space-y-4">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#F8EDEA] leading-tight">
                    {(aboutData?.heading?.line1 || 'The').split('').map((letter, index) => (
                      <span
                        key={index}
                        className="inline-block hover:text-[#D4A574] transition-all duration-300 cursor-default"
                        style={{
                          animation: isVisible ? `fadeInUp 0.6s ease-out forwards` : 'none',
                          animationDelay: `${index * 50}ms`,
                          opacity: isVisible ? 1 : 0,
                        }}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </span>
                    ))}{' '}
                    <span className="italic font-serif text-[#D4A574]">
                      {(aboutData?.heading?.line2 || 'Creative').split('').map((letter, index) => (
                        <span
                          key={index}
                          className="inline-block hover:scale-110 transition-transform duration-300 cursor-default"
                          style={{
                            animation: isVisible ? `fadeInUp 0.6s ease-out forwards` : 'none',
                            animationDelay: `${150 + index * 50}ms`,
                            opacity: isVisible ? 1 : 0,
                          }}
                        >
                          {letter === ' ' ? '\u00A0' : letter}
                        </span>
                      ))}
                    </span>{' '}
                    Journey
                  </h2>
                  <h3 
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-[#D4A574] leading-tight hover:scale-105 transition-transform duration-500 cursor-default" 
                    style={{ 
                      WebkitTextStroke: '1.5px #D4A574', 
                      WebkitTextFillColor: 'transparent',
                      animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                      animationDelay: '400ms',
                      opacity: isVisible ? 1 : 0,
                    }}
                  >
                    Behind
                  </h3>
                  <h2 
                    className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#F8EDEA] leading-tight"
                    style={{
                      animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                      animationDelay: '500ms',
                      opacity: isVisible ? 1 : 0,
                    }}
                  >
                    {aboutData?.heading?.line3 || 'The'}
                  </h2>
                </div>

                {/* Description Text with stagger */}
                <div 
                  className="space-y-3 md:space-y-4 text-xs md:text-sm lg:text-base leading-relaxed text-[#F8EDEA]/80 max-w-md"
                  style={{
                    animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                    animationDelay: '600ms',
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  <p className="hover:text-[#F8EDEA] transition-colors duration-300">
                    {aboutData?.description || 'My journey as a designer is driven by a deep-seated passion for continuous learning and creative exploration.'}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Right side - Profile Image and Design Box with parallax */}
          <div 
            className={`relative transition-all duration-[800ms] ease-out delay-200 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}
            style={{
              transform: window.innerWidth >= 768 ? `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` : 'none',
            }}
          >
            <div className="relative">
              {/* Profile Image with circular frame and enhanced effects */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto mb-6 md:mb-8 group">
                <div className="absolute inset-0 rounded-full border-4 border-[#D4A574] overflow-hidden hover:border-[#F8EDEA] transition-all duration-500 hover:scale-105 hover:rotate-3">
                  {aboutData?.profileImage ? (
                    <img
                      src={urlFor(aboutData.profileImage).width(800).url()}
                      alt={aboutData.profileImage.alt || 'Profile'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <img
                      src="/anshika-toon.png"
                      alt="Anshika Mishra - Graphic Designer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#78201B]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                {/* Decorative circles behind with animation */}
                <div className="absolute inset-0 rounded-full bg-[#D4A574]/20 -z-10 scale-110 animate-pulse-slow"></div>
                <div className="absolute inset-0 rounded-full bg-[#F8EDEA]/10 -z-20 scale-125 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Design Philosophy Box with enhanced animations */}
              <div className="relative max-w-md mx-auto group">
                <div className="bg-transparent border-3 md:border-4 border-dashed border-[#D4A574] p-4 md:p-6 lg:p-8 relative hover:border-[#F8EDEA] transition-all duration-500 md:hover:scale-105 md:hover:-rotate-1">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black italic font-serif text-[#D4A574] mb-3 md:mb-4 group-hover:text-[#F8EDEA] transition-colors duration-500">
                    {aboutData?.designPhilosophy?.title || 'Designs'}
                  </h3>
                  
                  <div className="space-y-2 md:space-y-3 text-xs md:text-sm lg:text-base leading-relaxed text-[#F8EDEA]/80 group-hover:text-[#F8EDEA] transition-colors duration-500">
                    <p>
                      {aboutData?.designPhilosophy?.content || 'For me, design transcends the role of a career; it is a powerful medium for creating work that resonates and makes a tangible, positive impact.'}
                    </p>
                  </div>

                  {/* Decorative arrow with animation */}
                  <div className="absolute -bottom-3 md:-bottom-4 -right-3 md:-right-4 text-[#D4A574] text-2xl md:text-4xl group-hover:text-[#F8EDEA] md:group-hover:translate-x-2 md:group-hover:translate-y-2 transition-all duration-500 animate-pulse">
                    ▶
                  </div>
                  
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-[#F8EDEA]/30 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-[#F8EDEA]/30 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
