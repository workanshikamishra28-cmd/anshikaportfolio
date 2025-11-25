import { useRef, useState, ReactNode } from 'react';

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  tiltStrength?: number;
}

export const MagneticCard = ({
  children,
  className = '',
  strength = 0.3,
  tiltStrength = 10,
}: MagneticCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Magnetic effect
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Tilt effect
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / rect.width) * tiltStrength;
    const rotateX = ((rect.height / 2 - y) / rect.height) * tiltStrength;

    setTransform({ x: deltaX, y: deltaY, rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`magnetic transform-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      {children}
    </div>
  );
};

// Parallax layer component
interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxLayer = ({
  children,
  speed = 0.5,
  className = '',
}: ParallaxLayerProps) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const elementTop = rect.top + scrolled;
        const windowHeight = window.innerHeight;

        if (scrolled + windowHeight > elementTop && scrolled < elementTop + rect.height) {
          setOffset((scrolled - elementTop) * speed);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={`parallax-layer ${className}`}
      style={{
        transform: `translateY(${offset}px)`,
      }}
    >
      {children}
    </div>
  );
};

// Liquid morph shape
export const LiquidShape = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`animate-liquid ${className}`}
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #D4A574 0%, #78201B 100%)',
      }}
    />
  );
};

// Hover scale with glow
interface HoverGlowProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export const HoverGlow = ({
  children,
  className = '',
  glowColor = '#D4A574',
}: HoverGlowProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        filter: isHovered ? `drop-shadow(0 0 20px ${glowColor})` : 'none',
      }}
    >
      {children}
    </div>
  );
};

import { useEffect } from 'react';
