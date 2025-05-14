'use client'

import { useEffect } from 'react'
import { TransitionLink } from './TransitionLink';


export default function SingleLink({
  href,
  page,
  linkType,
  children,
  openInNewTab,
}: Sanity.Link) {
  
  useEffect(() => {
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

    const startScrambleHandler: EventListener = (e) => {
      const el = e.currentTarget as HTMLElement;
      startScramble(el);
    };
    
    const stopScrambleHandler: EventListener = (e) => {
      const el = e.currentTarget as HTMLElement;
      stopScramble(el);
    };
    

    elements.forEach((el) => {
      originals.set(el, el.textContent || '');
      el.addEventListener('mouseenter', startScrambleHandler);
      el.addEventListener('mouseleave', stopScrambleHandler);
      el.dataset.scrambleListenersAttached = 'true'; 
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', startScrambleHandler);
        el.removeEventListener('mouseleave', stopScrambleHandler);
      });
    };
  }, []);
  

  const linkClass = 'flex gap-4 items-center';

  if (linkType === 'page') {
    if (page?._type === 'home') {
      return <TransitionLink href={`/${page?.language}`} className={linkClass}>{children}</TransitionLink>
    } else if (page?._type === 'project.post') {
      return <TransitionLink href={`${page?.language}/projects/${page?.slug}`} className={linkClass}>{children}</TransitionLink>
    } else {
      return <TransitionLink href={`${page?.language}/${page?.slug}`} className={linkClass}>{children}</TransitionLink>
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
