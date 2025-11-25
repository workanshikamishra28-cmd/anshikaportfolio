# Card Stack Animation - Implementation Guide

## Overview
Enhanced the **Selected Works** section with a smooth, scroll-triggered card stacking animation. Cards now stack on top of each other as the user scrolls, creating an engaging and interactive experience.

## Features

### 🎯 Scroll-Triggered Stacking
- Cards automatically stack as you scroll through the section
- Smooth, physics-based easing for natural movement
- Each card has a staggered animation timing for visual interest

### 📐 Dynamic Positioning
- **Initial State**: Cards are spaced vertically with generous gaps
- **Stacked State**: Cards compress to the top with minimal spacing
- Responsive spacing adjusts for mobile and desktop

### 🎨 Visual Effects
1. **Scale Transformation**: Cards slightly shrink as they stack (4% per card)
2. **Rotation**: Subtle alternating rotation (±3°) for depth
3. **Opacity**: Cards behind get slightly dimmed (15% max)
4. **Z-Index**: Proper layering with first card on top

### 📱 Responsive Design
- **Mobile**: 
  - Stack position: 80px from top
  - Card spacing: 20px
  - Initial gap: 120px
- **Desktop**: 
  - Stack position: 120px from top
  - Card spacing: 30px
  - Initial gap: 150px

## Technical Implementation

### Animation Parameters
```typescript
// Stacking timing
const cardDelay = 0.15; // Stagger between cards
const progressRange = cardEndProgress - cardStartProgress;

// Easing function (ease-out quadratic)
cardProgress = 1 - Math.pow(1 - cardProgress, 2);

// Transform calculations
const currentScale = initialScale - ((initialScale - finalScale) * cardProgress);
const rotation = maxRotation * (1 - cardProgress);
const opacity = 1 - ((1 - minOpacity) * (index / totalCards) * cardProgress);
```

### Scroll Progress Calculation
```typescript
// Container-based progress tracking
const scrollableDistance = containerHeight + viewportHeight;
const scrolled = viewportHeight - containerTop;
let progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

// Apply cubic ease-out for smooth deceleration
progress = 1 - Math.pow(1 - progress, 3);
```

## UI Components

### Card Stack Component
Created a reusable `card-stack.tsx` component in `src/components/ui/`:
- Pure CSS/React implementation (no external dependencies)
- Configurable offset and scale factor
- Smooth transitions with cubic-bezier easing

### Progress Indicator
- Fixed position on the right side
- Shows current card progress
- Animated dots that grow and change color
- Opacity transitions based on scroll position

## Styling

### Theme Integration
All animations respect the existing color palette:
- **Primary**: #78201B (Persian Plum)
- **Accent**: #D4A574 (Gold)
- **Background**: #F8EDEA (Soft Pink)

### Custom CSS Animations
Added to `index.css`:
```css
@keyframes cardStack {
  from {
    transform: translateY(0) scale(1) rotate(0deg);
  }
  to {
    transform: translateY(-100px) scale(0.95) rotate(0deg);
  }
}

.card-stack-item {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
              opacity 0.3s ease-out;
}
```

## Performance Optimizations

1. **Passive Event Listeners**: Scroll events use `{ passive: true }`
2. **Will-Change**: Applied to animated properties
3. **Transform-based**: Uses GPU-accelerated transforms
4. **Debounced Calculations**: Efficient scroll handling
5. **Conditional Rendering**: Only calculates when section is visible

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS transforms and transitions
- Intersection Observer API
- No external animation libraries required

## Customization

### Adjust Stacking Speed
Modify the `cardDelay` value in SelectedWorks.tsx:
```typescript
const cardDelay = 0.15; // Increase for slower, decrease for faster
```

### Change Stack Position
Update the `stackTop` values:
```typescript
const stackTop = isMobile ? 80 : 120; // Pixels from top
```

### Modify Scale Effect
Adjust the scale factor:
```typescript
const finalScale = 1 - (index * 0.04); // Change 0.04 to desired value
```

## Testing
1. Scroll to the "Selected Works" section
2. Observe cards stacking smoothly as you scroll
3. Check progress indicator on the right
4. Test on mobile and desktop viewports
5. Verify smooth animations without jank

## Future Enhancements
- [ ] Add touch/swipe gestures for mobile
- [ ] Implement card expansion on click
- [ ] Add parallax effects to card content
- [ ] Create keyboard navigation support
- [ ] Add accessibility improvements (ARIA labels)

## Credits
Inspired by modern portfolio designs and scroll-driven animations.
Implemented with pure CSS and React for optimal performance.
