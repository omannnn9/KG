import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

/**
 * The hero headline rises line by line from behind a mask, once, on load.
 * GSAP SplitText keeps nested markup (the italic accent) and re-splits if the fonts or width change.
 * If JavaScript or motion is unavailable, the heading simply renders as normal text.
 */
export function HeadlineReveal({
  children,
  className,
  delay = 0.35,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const split = SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'headline-line',
      autoSplit: true,
      // Returning the tween lets SplitText carry its progress across re-splits (font swap, rotation).
      onSplit: self =>
        gsap.from(self.lines, {
          yPercent: 105,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.09,
          delay,
          // Restore the original text nodes once settled, so line masks never clip descenders.
          onComplete: () => split.revert(),
        }),
    });

    return () => split.revert();
  }, [delay]);

  return (
    <h1 ref={ref} className={className}>
      {children}
    </h1>
  );
}
