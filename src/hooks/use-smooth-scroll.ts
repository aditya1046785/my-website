'use client';

import { useCallback } from 'react';

export function useSmoothScroll() {
  const handleScrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
    e.preventDefault();
    const targetElement = selector === '#' ? document.body : document.querySelector(selector);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return handleScrollTo;
}
