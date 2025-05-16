'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function PageTransitionHandler() {
  function stopScramble(el: HTMLElement) {
    const intervalId = el.dataset.intervalId ? parseInt(el.dataset.intervalId, 10) : null;
    if (intervalId) {
      clearInterval(intervalId); 
      delete el.dataset.intervalId; 
    }
    const original = el.getAttribute('data-original-text') || el.textContent || '';
    if (original) el.textContent = original;
  }
  
  const pathname = usePathname();

  useEffect(() => {
    const overlay = document.getElementById('page-loader');
    const body = document.body;
    const headerLogo = document.querySelector<HTMLElement>('.logo-header');
    const header = document.querySelector('header');

    if (headerLogo) {
      stopScramble(headerLogo);
    }

    if (!overlay) return;

    overlay.classList.remove('visible');
    body.classList.remove('loading');
    header?.classList.remove('no-touch');

  }, [pathname]); // se dispara en cada ruta nueva

  return null;
}
