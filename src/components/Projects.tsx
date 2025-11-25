import { useState, useEffect, useRef } from "react";
import { getProjects } from "@/lib/sanity-queries";
import type { Project as SanityProject } from "@/types/sanity";
import useEmblaCarousel from 'embla-carousel-react';

type Category = "All" | "Posters" | "Logo" | "Branding" | "Packaging" | "Presentation";

interface Project {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  imageUrl?: string;
}

const useIntersectionObserver = (options?: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { targetRef, isIntersecting };
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const categories: Category[] = ["All", "Posters", "Logo", "Branding", "Packaging", "Presentation"];

  useEffect(() => {
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
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data: SanityProject[] = await getProjects(activeCategory);
        const formattedProjects: Project[] = data.map((project) => ({
          id: project._id,
          title: project.title,
          category: project.category,
          imageUrl: project.image?.asset?.url || undefined,
        }));
        setProjects(formattedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [activeCategory]);

  const filteredProjects = projects;
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section ref={sectionRef} className="py-12 md:py-20 px-4 md:px-6 lg:px-12 relative bg-[#F8EDEA] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#D4A574]/5 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#78201B]/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated header */}
        <div className={`mb-8 md:mb-12 relative transition-all duration-[800ms] ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 text-[#78201B]">
            {/* Animated word reveal */}
            {'Projects'.split('').map((letter, index) => (
              <span
                key={index}
                className="inline-block hover:text-[#D4A574] transition-colors duration-300 cursor-default"
                style={{
                  animation: isVisible ? `fadeInUp 0.6s ease-out forwards` : 'none',
                  animationDelay: `${index * 50}ms`,
                  opacity: 0,
                }}
              >
                {letter}
              </span>
            ))}
          </h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#78201B] to-[#D4A574] rounded-full" 
               style={{
                 animation: isVisible ? 'slideRight 0.8s ease-out forwards' : 'none',
                 animationDelay: '400ms',
                 transform: 'scaleX(0)',
                 transformOrigin: 'left',
               }}
          />
        </div>

        {/* Category tabs with enhanced animations - Horizontal scroll on mobile */}
        <div className={`mb-12 md:mb-16 transition-all duration-[800ms] ease-out delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex md:flex-wrap gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide snap-x snap-mandatory">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`group relative px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-xs md:text-sm lg:text-base transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap flex-shrink-0 snap-start ${
                  activeCategory === category
                    ? 'bg-[#78201B] text-[#F8EDEA] shadow-lg scale-105'
                    : 'bg-white text-[#78201B] border-2 border-[#78201B]/20 hover:border-[#78201B] hover:scale-105 hover:shadow-md'
                }`}
                style={{
                  animation: isVisible ? `fadeInUp 0.5s ease-out forwards` : 'none',
                  animationDelay: `${300 + index * 50}ms`,
                  opacity: isVisible ? 1 : 0,
                }}
              >
                {/* Animated background on hover */}
                {activeCategory !== category && (
                  <span className="absolute inset-0 bg-gradient-to-r from-[#D4A574]/0 via-[#D4A574]/10 to-[#D4A574]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                )}
                <span className="relative">{category}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-[#78201B] text-xl md:text-2xl animate-pulse">Loading projects...</div>
          </div>
        ) : (
          <>
            {/* Desktop Grid View */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            {/* Mobile Carousel View */}
            <div className="md:hidden relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4 touch-pan-y">
                  {filteredProjects.map((project, index) => (
                    <div key={project.id} className="flex-[0_0_85%] min-w-0">
                      <ProjectCard project={project} index={index} />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Carousel Navigation Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {filteredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      emblaApi?.selectedScrollSnap() === index 
                        ? 'bg-[#78201B] w-6' 
                        : 'bg-[#78201B]/30'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Swipe Indicator */}
              {filteredProjects.length > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4 text-[#78201B]/50 text-xs animate-pulse">
                  <span>←</span>
                  <span>Swipe to explore</span>
                  <span>→</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isIntersecting && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isIntersecting, isLoaded]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const getIcon = (idx: number) => {
    const icons = ['✦', '★', '◆', '●'];
    return icons[idx % 4];
  };

  return (
    <div 
      ref={targetRef} 
      className={`group cursor-pointer transition-all duration-700 ease-out ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${index * 50}ms`,
      }}
    >
      <div 
        ref={cardRef}
        className="relative overflow-hidden transition-all duration-500 ease-out transform-3d"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * -0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
        }}
      >
        {/* Image container with enhanced effects */}
        <div className="aspect-[4/3] bg-gradient-to-br from-[#E8D5D0] to-[#D4C5C0] rounded-xl md:rounded-2xl flex items-center justify-center relative overflow-hidden mb-3 md:mb-4 shadow-md group-hover:shadow-2xl transition-all duration-500">
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
          
          {!isLoaded ? (
            <div className="absolute inset-0 bg-[#E8D5D0] animate-pulse">
              <div className="flex items-center justify-center h-full">
                <div className="text-[#78201B]/20 text-5xl animate-bounce">⋯</div>
              </div>
            </div>
          ) : (
            <>
              {project.imageUrl ? (
                <>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-1"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#78201B]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* View project text on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <span className="text-white font-bold text-lg bg-[#78201B]/80 px-6 py-2 rounded-full backdrop-blur-sm">
                      View Project →
                    </span>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 group-hover:scale-110 transition-transform duration-500">
                  <div className="text-6xl md:text-7xl mb-3 text-[#A08080] group-hover:text-[#D4A574] transition-colors duration-300 animate-float">
                    {getIcon(index)}
                  </div>
                  <div className="text-sm text-[#A08080] font-medium group-hover:text-[#78201B] transition-colors duration-300">
                    Project Image
                  </div>
                </div>
              )}
            </>
          )}
          
          {/* Corner accent */}
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4A574]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#D4A574]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Card footer with enhanced animation */}
        <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
          <h3 className="text-sm md:text-base font-bold text-[#78201B] mb-1 group-hover:text-[#D4A574] transition-colors duration-300 line-clamp-1">
            {project.title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-xs md:text-sm text-[#A08080]">{project.category}</p>
            <span className="text-[#D4A574] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
