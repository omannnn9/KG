import { useEffect, type RefObject } from 'react';

const MAX_X = 7; // degrees, top/bottom
const MAX_Y = 9; // degrees, left/right

/**
 * A light 3D tilt written as CSS variables (--tilt-x / --tilt-y) on `ref`.
 * Mouse and trackpad: follows the pointer and settles on leave. Touch: leans towards the finger while it
 * is down, then settles. No device-motion permission, nothing under reduced motion, scrolling untouched.
 */
export function useTilt(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    let next = { x: 0, y: 0 };
    const write = () => {
      frame = 0;
      el.style.setProperty('--tilt-x', `${next.x.toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${next.y.toFixed(2)}deg`);
    };
    const lean = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
      const py = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
      next = { x: (0.5 - py) * 2 * MAX_X, y: (px - 0.5) * 2 * MAX_Y };
      if (!frame) frame = requestAnimationFrame(write);
    };
    const settle = () => {
      next = { x: 0, y: 0 };
      if (!frame) frame = requestAnimationFrame(write);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' || event.pointerType === 'pen') lean(event);
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') return;
      window.clearTimeout(release);
      lean(event);
    };
    let release = 0;
    const onUp = (event: PointerEvent) => {
      if (event.pointerType === 'touch') release = window.setTimeout(settle, 380);
    };
    // Touch fires pointerleave straight after pointerup, so only a mouse or pen leaving settles at once.
    const onLeave = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') settle();
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointerdown', onDown, { passive: true });
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', settle);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(release);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', settle);
    };
  }, [ref]);
}
