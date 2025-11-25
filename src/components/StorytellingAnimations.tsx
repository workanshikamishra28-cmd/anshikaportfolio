import { useEffect, useRef, useState } from 'react';
import { useScrollReveal, useParallax, useMagneticEffect } from '@/hooks/useAdvancedAnimations';

/**
 * Storytelling Animations Component Library
 * Advanced animations that enhance narrative and user engagement
 */

// 1. Scroll-triggered text reveal with mask effect
export const MaskedTextReveal = ({ 
  text, 
  className = '' 
}: { 
  text: string; 
  className?: string;
}) => {
  const { ref, isVisible } = useScrollReveal(0.3);

  return (
    <div ref={ref as any} className={`relative overflow-hidden ${className}`}>
      <div 
        className={`transition-all duration-[1200ms] ease-out ${
          isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full opacity-0'
        }`}
      >
        {text}
      </div>
    </div>
  );
};

// 2. Staggered word reveal for headlines
export const StaggeredWords = ({ 
  text, 
  className = '',
  staggerDelay = 100 
}: { 
  text: string; 
  className?: string;
  staggerDelay?: number;
}) => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const words = text.split(' ');

  return (
    <div ref={ref as any} className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block mr-2 transition-all duration-700 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100 blur-0' 
              : 'translate-y-8 opacity-0 blur-sm'
          }`}
          style={{ 
            transitionDelay: `${index * staggerDelay}ms` 
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

// 3. Parallax image container
export const ParallaxImage = ({ 
  src, 
  alt, 
  speed = 0.5,
  className = '' 
}: { 
  src: string; 
  alt: string; 
  speed?: number;
  className?: string;
}) => {
  const { ref, offset } = useParallax(speed);

  return (
    <div ref={ref as any} className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ 
          transform: `translateY(${offset}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
    </div>
  );
};

// 4. Magnetic card with hover effect
export const MagneticCard = ({ 
  children, 
  className = '',
  strength = 0.2 
}: { 
  children: React.ReactNode; 
  className?: string;
  strength?: number;
}) => {
  const { ref, position } = useMagneticEffect(strength);

  return (
    <div
      ref={ref as any}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      {children}
    </div>
  );
};

// 5. Scroll progress indicator
export const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-[#F8EDEA]/20 z-50">
      <div 
        className="h-full bg-gradient-to-r from-[#78201B] via-[#D4A574] to-[#78201B] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// 6. Floating shapes background
export const FloatingShapes = ({ 
  count = 5,
  className = '' 
}: { 
  count?: number;
  className?: string;
}) => {
  const shapes = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute rounded-full opacity-10 animate-float"
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            background: `radial-gradient(circle, #D4A574 0%, transparent 70%)`,
            animationDuration: `${shape.duration}s`,
            animationDelay: `${shape.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// 7. Text scramble effect
export const ScrambleText = ({ 
  text, 
  className = '',
  scrambleDuration = 1000 
}: { 
  text: string; 
  className?: string;
  scrambleDuration?: number;
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

  const scramble = () => {
    setIsScrambling(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span 
      className={`cursor-pointer ${className}`}
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  );
};

// 8. Reveal on scroll with clip-path
export const ClipPathReveal = ({ 
  children, 
  direction = 'left',
  className = '' 
}: { 
  children: React.ReactNode; 
  direction?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}) => {
  const { ref, isVisible } = useScrollReveal(0.2);

  const getClipPath = () => {
    if (!isVisible) {
      switch (direction) {
        case 'left': return 'inset(0 100% 0 0)';
        case 'right': return 'inset(0 0 0 100%)';
        case 'top': return 'inset(0 0 100% 0)';
        case 'bottom': return 'inset(100% 0 0 0)';
      }
    }
    return 'inset(0 0 0 0)';
  };

  return (
    <div
      ref={ref as any}
      className={`transition-all duration-[1000ms] ease-out ${className}`}
      style={{
        clipPath: getClipPath(),
      }}
    >
      {children}
    </div>
  );
};

// 9. Morphing blob background
export const MorphingBlob = ({ 
  color = '#D4A574',
  className = '' 
}: { 
  color?: string;
  className?: string;
}) => {
  return (
    <div className={`absolute animate-liquid ${className}`}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill={color}
          d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.2C64.8,55.2,53.8,66.6,40.3,73.4C26.8,80.2,10.8,82.4,-4.3,79.9C-19.4,77.4,-33.5,70.2,-46.8,62.8C-60.1,55.4,-72.6,47.8,-79.8,36.4C-87,25,-89,9.8,-87.5,-5.1C-86,-20,-81,-34.6,-72.4,-46.8C-63.8,-59,-51.6,-68.8,-38.1,-76.3C-24.6,-83.8,-9.8,-88.9,3.7,-95.5C17.2,-102.1,30.6,-83.6,44.7,-76.4Z"
          transform="translate(100 100)"
          opacity="0.15"
        />
      </svg>
    </div>
  );
};

// 10. Counter animation
export const AnimatedCounter = ({ 
  end, 
  duration = 2000,
  suffix = '',
  className = '' 
}: { 
  end: number; 
  duration?: number;
  suffix?: string;
  className?: string;
}) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal(0.5);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isVisible, end, duration]);

  return (
    <span ref={ref as any} className={className}>
      {count}{suffix}
    </span>
  );
};

// 11. Glitch effect on hover
export const GlitchText = ({ 
  text, 
  className = '' 
}: { 
  text: string; 
  className?: string;
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      <span className={isGlitching ? 'animate-glitch' : ''}>
        {text}
      </span>
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-0 text-[#D4A574] opacity-70"
            style={{ 
              transform: 'translate(-2px, -2px)',
              clipPath: 'inset(0 0 50% 0)'
            }}
          >
            {text}
          </span>
          <span 
            className="absolute top-0 left-0 text-[#78201B] opacity-70"
            style={{ 
              transform: 'translate(2px, 2px)',
              clipPath: 'inset(50% 0 0 0)'
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
};

// 12. Spotlight effect following cursor
export const SpotlightCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-screen"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(212, 165, 116, 0.15) 0%, transparent 70%)',
        transition: 'left 0.1s ease-out, top 0.1s ease-out',
      }}
    />
  );
};

// 13. Typewriter with cursor
export const TypewriterEffect = ({ 
  texts, 
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = '' 
}: { 
  texts: string[]; 
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// 14. Ripple effect on click
export const RippleButton = ({ 
  children, 
  onClick,
  className = '' 
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
  className?: string;
}) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
    
    onClick?.();
  };

  return (
    <button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </button>
  );
};

// 15. Infinite scroll marquee with pause on hover
export const InfiniteMarquee = ({ 
  items, 
  speed = 20,
  className = '' 
}: { 
  items: React.ReactNode[]; 
  speed?: number;
  className?: string;
}) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className="inline-block mx-8">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
