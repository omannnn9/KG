import { useEffect, useState } from 'react';

/** A flag that switches on when an action fires and quietly resets, for tap confirmations. */
export function useConfirmation(ms = 2400) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!active) return undefined;
    const timer = window.setTimeout(() => setActive(false), ms);
    return () => window.clearTimeout(timer);
  }, [active, ms]);
  return [active, () => setActive(true)] as const;
}
