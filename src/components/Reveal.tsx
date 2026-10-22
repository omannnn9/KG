import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  role?: string;
  /** Seconds between direct children; 0 moves the group as one block. */
  stagger?: number;
  /** Rise distance in px. */
  distance?: number;
  duration?: number;
  delay?: number;
  /** Fraction of the element that must be visible before it reveals. */
  threshold?: number;
  /** 'up' draws the content upward through a soft mask instead of rising. */
  wipe?: 'up';
  /** Starting scale, for objects such as the business card. */
  scale?: number;
};

/**
 * The page's scroll-reveal vocabulary, driven by IntersectionObserver and CSS transitions.
 * Content is visible by default. It is only armed (hidden, waiting) when it starts below the fold,
 * the browser can observe it and the visitor has not asked for reduced motion, so a script failure
 * or a missed observer can never leave text invisible.
 */
export function Reveal({
  children,
  className,
  role,
  stagger = 0,
  distance = 28,
  duration = 0.9,
  delay = 0,
  threshold = 0.12,
  wipe,
  scale,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    // Already on screen at load: it is part of the first view, not something to reveal.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return undefined;

    if (stagger > 0) {
      Array.from(el.children).forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i)));
    }
    el.dataset.reveal = 'armed';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = 'shown';
        observer.disconnect();
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger, threshold]);

  const style = {
    '--reveal-distance': `${distance}px`,
    '--reveal-duration': `${duration}s`,
    '--reveal-delay': `${delay}s`,
    '--reveal-stagger': `${stagger}s`,
    '--reveal-scale': scale ?? 1,
  } as CSSProperties;

  const variant = wipe ? 'wipe' : stagger > 0 ? 'stagger' : 'rise';

  return (
    <div ref={ref} className={className} role={role} style={style} data-reveal-variant={variant}>
      {children}
    </div>
  );
}
