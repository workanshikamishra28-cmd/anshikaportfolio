import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  animation?: 'reveal' | 'morph' | 'glitch' | 'fade' | 'slide';
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const AnimatedText = ({
  text,
  className = '',
  animation = 'reveal',
  delay = 0,
  stagger = 50,
  as: Component = 'span',
}: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const characters = text.split('');

  const getAnimationClass = (index: number) => {
    const baseDelay = delay + index * stagger;
    
    switch (animation) {
      case 'reveal':
        return `animate-text-reveal opacity-0`;
      case 'morph':
        return `animate-morph-in opacity-0`;
      case 'glitch':
        return isVisible ? 'animate-glitch' : '';
      case 'fade':
        return `animate-fade-in-up opacity-0`;
      case 'slide':
        return `animate-slide-in-left opacity-0`;
      default:
        return '';
    }
  };

  return (
    <Component className={`inline-block ${className}`}>
      {characters.map((char, index) => (
        <span
          key={index}
          className={`inline-block ${getAnimationClass(index)}`}
          style={{
            animationDelay: `${delay + index * stagger}ms`,
            animationFillMode: 'forwards',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Component>
  );
};

// Word-by-word animation
export const AnimatedWords = ({
  text,
  className = '',
  delay = 0,
  stagger = 100,
}: Omit<AnimatedTextProps, 'animation'>) => {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block animate-fade-in-up opacity-0 mr-2"
          style={{
            animationDelay: `${delay + index * stagger}ms`,
            animationFillMode: 'forwards',
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

// Typewriter effect
export const TypewriterText = ({
  text,
  className = '',
  speed = 50,
  delay = 0,
}: Omit<AnimatedTextProps, 'animation' | 'stagger'> & { speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayedText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, speed);
        return () => clearTimeout(timer);
      }
    }, delay);

    return () => clearTimeout(startTimer);
  }, [currentIndex, text, speed, delay]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

// Gradient animated text
export const GradientText = ({
  text,
  className = '',
}: Pick<AnimatedTextProps, 'text' | 'className'>) => {
  return (
    <span className={`text-gradient-animate ${className}`}>
      {text}
    </span>
  );
};

// Clip-path reveal text
export const ClipRevealText = ({
  text,
  className = '',
  delay = 0,
}: Omit<AnimatedTextProps, 'animation' | 'stagger'>) => {
  return (
    <span
      className={`inline-block animate-clip-reveal ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {text}
    </span>
  );
};
