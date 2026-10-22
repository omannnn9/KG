import { useEffect, type RefObject } from 'react';

/**
 * Writes the pointer position over `ref` as --px / --py (-1 … 1) so CSS can shift layers by
 * different amounts. Only for a fine pointer that can hover (desktop mice and trackpads), never
 * on touch, never with reduced motion, and without any device-motion permission.
 */
export function usePointerDepth(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const capable = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!capable.matches) return undefined;

    let frame = 0;
    let x = 0;
    let y = 0;
    const write = () => {
      frame = 0;
      el.style.setProperty('--px', x.toFixed(3));
      el.style.setProperty('--py', y.toFixed(3));
    };
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(write);
    };
    const onLeave = () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(write);
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref]);
}
