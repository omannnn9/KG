import SplitText from './reactbits/SplitText';

/**
 * Section heading whose words come into focus as it scrolls into view (React Bits SplitText,
 * blur effect, so no line mask clips the descenders). The h2 keeps its id for aria-labelledby;
 * SplitText labels its own text for assistive tech and shows the plain heading with reduced motion.
 */
export function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="section__title">
      <SplitText
        text={children}
        tag="span"
        splitType="words"
        effect="blur"
        delay={70}
        duration={0.9}
        threshold={0.2}
        rootMargin="-40px"
        textAlign="left"
      />
    </h2>
  );
}
