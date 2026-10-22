import type { ReactNode } from 'react';
import AnimatedContent, { type AnimatedContentProps } from './reactbits/AnimatedContent';

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger the direct children instead of moving the group as one block. */
  stagger?: number;
  role?: string;
} & Pick<AnimatedContentProps, 'wipe' | 'distance' | 'scale' | 'delay' | 'threshold' | 'duration'>;

/**
 * The page's one scroll-reveal vocabulary: a short fade-and-rise that plays once.
 * Built on React Bits AnimatedContent, which renders the final state when reduced motion is requested.
 */
export function Reveal({
  children,
  className,
  stagger = 0,
  distance = 28,
  duration = 0.9,
  threshold = 0.12,
  ...rest
}: Props) {
  return (
    <AnimatedContent
      className={className}
      distance={distance}
      duration={duration}
      ease="power3.out"
      threshold={threshold}
      stagger={stagger}
      {...rest}
    >
      {children}
    </AnimatedContent>
  );
}
