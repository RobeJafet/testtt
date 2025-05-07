'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function SingleLink({
  href,
  page,
  linkType,
  children,
  openInNewTab,
}: Sanity.Link) {
  useEffect(() => {
    // Solo si el dispositivo soporta hover (no touch)
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!supportsHover) return;

    const elements = document.querySelectorAll<HTMLElement>('.scramble-hover');

    const intervals = new Map<HTMLElement, NodeJS.Timeout>();
    const timeouts = new Map<HTMLElement, NodeJS.Timeout>();
    const originals = new Map<HTMLElement, string>();

    function shuffleString(str: string): string {
      const arr = str.split('');
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.join('');
    }

    function startScramble(el: HTMLElement) {
        const originalText = originals.get(el) || el.textContent || '';
        originals.set(el, originalText);
      
        el.textContent = shuffleString(originalText);
      
        const interval = setInterval(() => {
          el.textContent = shuffleString(originalText);
        }, 100);
        intervals.set(el, interval);
      
        const timeout = setTimeout(() => stopScramble(el), 500);
        timeouts.set(el, timeout);
      }

    function stopScramble(el: HTMLElement) {
      clearInterval(intervals.get(el));
      clearTimeout(timeouts.get(el));
      const original = originals.get(el);
      if (original) el.textContent = original;
    }

    elements.forEach((el) => {
      originals.set(el, el.textContent || '');

      const enter = () => startScramble(el);
      const leave = () => stopScramble(el);

      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);

      // Cleanup cuando cambie la ruta
      el.dataset.scrambleListenersAttached = 'true'; // Evitar duplicados
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', startScramble as any);
        el.removeEventListener('mouseleave', stopScramble as any);
      });
    };
  }, []);

  const linkClass = 'flex gap-4 items-center';

  if (linkType === 'page') {
    if (page?._type === 'home') {
      return <Link href="/" className={linkClass}>{children}</Link>
    } else if (page?._type === 'project.post') {
      return <Link href={`/projects/${page?.slug}`} className={linkClass}>{children}</Link>
    } else {
      return <Link href={`/${page?.slug}`} className={linkClass}>{children}</Link>
    }
  }

  return (
    <a
      href={href}
      target={openInNewTab ? '_blank' : ''}
      rel={openInNewTab ? 'noopener noreferrer' : ''}
      className={linkClass}
    >
      {children}
    </a>
  );
}
