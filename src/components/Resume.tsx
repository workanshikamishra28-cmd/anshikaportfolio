import { useEffect, useRef, useState } from 'react';
import { getResumeData } from '@/lib/sanity-queries';
import { urlFor } from '@/lib/sanity';
import type { ResumeData } from '@/types/sanity';

const Resume = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Fetch resume data from Sanity
    const fetchResumeData = async () => {
      try {
        const data = await getResumeData();
        setResumeData(data);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();

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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex flex-col md:flex-row"
    >
      {/* Left Panel - Resume Content */}
      <div 
        className={`w-full md:w-1/2 p-8 md:p-12 lg:p-16 font-sans relative z-10 bg-[#F8EDEA] text-[#78201B] transition-all duration-[800ms] ease-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}
      >
        {/* Header */}
        <div className="mb-12">
          {resumeData?.resumeUrl ? (
            <a 
              href={resumeData.resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl md:text-3xl font-bold mb-8 text-[#78201B] hover:text-[#D4A574] transition-colors duration-300 inline-block cursor-pointer"
              aria-label="Download Resume"
            >
              Anshika.cv
            </a>
          ) : (
            <h1 className="text-2xl md:text-3xl font-bold mb-8 text-[#78201B]">Anshika.cv</h1>
          )}
          
          {loading ? (
            <div className="text-[#78201B]">Loading...</div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-2">{resumeData?.name || 'ANSHIKA MISHRA'}</h2>
                <h3 className="text-2xl md:text-3xl font-bold text-[#D4A574]">{resumeData?.title || 'GRAPHIC DESIGNER'}</h3>
              </div>

              <p className="text-base md:text-lg leading-relaxed text-[#78201B]/80 max-w-xl">
                {resumeData?.bio || 'Creative designer specializing in branding, illustration, editorial design, and packaging.'}
              </p>
            </>
          )}
        </div>

        {/* Experience Section */}
        <div className="mb-12 space-y-4">
          <h4 className="text-xl font-bold mb-6 text-[#78201B]">EXPERIENCE</h4>
          
          <div className="space-y-3 font-mono text-sm md:text-base">
            {resumeData?.experience?.map((exp, index) => (
              <div key={index} className="flex flex-wrap items-center gap-2 md:gap-4">
                <span className="font-bold min-w-[120px]">{exp.company}</span>
                <span className="text-[#D4A574]">{exp.role}</span>
                <span className="ml-auto text-[#78201B]/60">{exp.period}</span>
              </div>
            ))}
            
            {resumeData?.education && (
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                <span className="font-bold min-w-[120px]">{resumeData.education.institution}</span>
                <span className="ml-auto text-[#78201B]/60">{resumeData.education.period}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-12">
          <h4 className="text-xl font-bold mb-6 text-[#78201B]">EXPERTISE</h4>
          
          <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
            <div>
              <p className="font-semibold mb-2">Design</p>
              <ul className="space-y-1 text-[#78201B]/80">
                {resumeData?.skills?.design?.map((skill, index) => (
                  <li key={index}>• {skill}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <p className="font-semibold mb-2">Tools</p>
              <ul className="space-y-1 text-[#78201B]/80">
                {resumeData?.skills?.tools?.map((tool, index) => (
                  <li key={index}>• {tool}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="absolute bottom-8 left-8 md:left-12">
          <div className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base font-semibold">
            {resumeData?.socialLinks?.linkedin && (
              <a href={resumeData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A574] transition-colors">LinkedIn</a>
            )}
            {resumeData?.socialLinks?.behance && (
              <a href={resumeData.socialLinks.behance} target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A574] transition-colors">Behance</a>
            )}
            {resumeData?.socialLinks?.instagram && (
              <a href={resumeData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A574] transition-colors">Instagram</a>
            )}
            {resumeData?.socialLinks?.email && (
              <a href={`mailto:${resumeData.socialLinks.email}`} className="hover:text-[#D4A574] transition-colors">Email</a>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Dithered/Pixelated Pattern */}
      <div 
        className={`w-full md:w-1/2 relative bg-[#78201B] transition-all duration-[800ms] ease-out delay-200 overflow-hidden ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}
      >
        {/* SVG Dithering Pattern */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Dithering pattern definition */}
            <pattern id="ditherPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="2" height="2" x="0" y="0" fill="#D4A574" opacity="0.3"/>
              <rect width="2" height="2" x="4" y="2" fill="#D4A574" opacity="0.3"/>
              <rect width="2" height="2" x="2" y="4" fill="#F8EDEA" opacity="0.2"/>
              <rect width="2" height="2" x="6" y="6" fill="#F8EDEA" opacity="0.2"/>
            </pattern>
            
            {/* Noise texture */}
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
              <feColorMatrix type="saturate" values="0"/>
              <feBlend mode="multiply" in="SourceGraphic"/>
            </filter>
          </defs>
          
          {/* Background with dither pattern */}
          <rect width="100%" height="100%" fill="url(#ditherPattern)"/>
        </svg>

        {/* Animated pixelated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Pixelated grid overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              linear-gradient(to right, #F8EDEA 1px, transparent 1px),
              linear-gradient(to bottom, #F8EDEA 1px, transparent 1px)
            `,
            backgroundSize: '8px 8px',
            imageRendering: 'pixelated'
          }}></div>

          {/* Large pixelated circle - animated */}
          <div 
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full animate-pulse-slow"
            style={{
              background: `radial-gradient(circle, #D4A574 0%, transparent 70%)`,
              opacity: 0.15,
              filter: 'blur(2px)',
              imageRendering: 'pixelated'
            }}
          ></div>

          {/* Pixelated square - rotating */}
          <div 
            className="absolute top-1/3 right-1/3 w-32 h-32 animate-float"
            style={{
              background: `repeating-linear-gradient(
                45deg,
                #D4A574 0px,
                #D4A574 4px,
                transparent 4px,
                transparent 8px
              )`,
              opacity: 0.2,
              imageRendering: 'pixelated'
            }}
          ></div>

          {/* Bottom pixelated circle */}
          <div 
            className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full"
            style={{
              background: `radial-gradient(circle, #F8EDEA 0%, transparent 60%)`,
              opacity: 0.1,
              filter: 'blur(3px)',
              imageRendering: 'pixelated'
            }}
          ></div>

          {/* Dithered cat-like shape using CSS */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="relative w-64 h-64">
              {/* Cat ears */}
              <div className="absolute top-0 left-12 w-16 h-16 bg-[#D4A574] transform -rotate-45" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
              <div className="absolute top-0 right-12 w-16 h-16 bg-[#D4A574] transform rotate-45" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
              
              {/* Cat head */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full bg-[#D4A574]"></div>
              
              {/* Cat body */}
              <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full bg-[#D4A574]"></div>
            </div>
          </div>

          {/* Central image with modern frame */}
          <div className="absolute inset-0 flex items-center justify-center z-10 p-8">
            <div className="relative w-full max-w-md aspect-[3/4]">
              {/* Main image container with grid background */}
              <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl">
                {/* Grid background behind image */}
                <div className="absolute inset-0 z-0" style={{
                  backgroundImage: `
                    linear-gradient(to right, #F8EDEA 1px, transparent 1px),
                    linear-gradient(to bottom, #F8EDEA 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                  backgroundColor: '#F8EDEA'
                }}></div>

                {/* Anshika's photo with dithered effect */}
                <div className="relative z-10 w-full h-full">
                  {resumeData?.profileImage ? (
                    <img
                      src={urlFor(resumeData.profileImage).width(800).url()}
                      alt={resumeData.profileImage.alt || resumeData.name}
                      className="w-full h-full object-cover"
                      style={{
                        mixBlendMode: 'multiply',
                        filter: 'contrast(1.1) grayscale(0.3)',
                      }}
                    />
                  ) : (
                    <img
                      src="/anshikaphoto.png"
                      alt="Anshika Mishra"
                      className="w-full h-full object-cover"
                      style={{
                        mixBlendMode: 'multiply',
                        filter: 'contrast(1.1) grayscale(0.3)',
                      }}
                    />
                  )}
                  
                  {/* Subtle dithered overlay on image */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        #78201B 2px,
                        #78201B 4px
                      ),
                      repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 2px,
                        #78201B 2px,
                        #78201B 4px
                      )
                    `,
                    backgroundSize: '4px 4px',
                    imageRendering: 'pixelated'
                  }}></div>
                </div>

                {/* Modern corner accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-[#D4A574] z-20"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-[#D4A574] z-20"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-[#D4A574] z-20"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-[#D4A574] z-20"></div>
              </div>

              {/* Modern label at bottom */}
              <div className="absolute -bottom-6 left-0 right-0 text-center z-20">
                <div className="inline-block bg-[#D4A574] text-[#78201B] px-6 py-2 rounded-full shadow-lg">
                  <p className="text-sm md:text-base font-bold tracking-wide">
                    {resumeData?.name || 'ANSHIKA MISHRA'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pixelated corner decorations */}
          <div className="absolute top-0 right-0 w-24 h-24" style={{
            background: `repeating-linear-gradient(
              90deg,
              #D4A574 0px,
              #D4A574 4px,
              transparent 4px,
              transparent 8px
            )`,
            opacity: 0.3,
            clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
          }}></div>
          
          <div className="absolute bottom-0 left-0 w-24 h-24" style={{
            background: `repeating-linear-gradient(
              90deg,
              #F8EDEA 0px,
              #F8EDEA 4px,
              transparent 4px,
              transparent 8px
            )`,
            opacity: 0.2,
            clipPath: 'polygon(0 100%, 100% 100%, 0 0)'
          }}></div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
