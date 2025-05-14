"use client";
import { useEffect, useRef, ReactNode } from "react";

type AnimatedScrambleProps = {
  children: ReactNode;
  targetSelector?: string;
  className?: string;
};

export default function AnimatedScrambleOnView({
  children,
  targetSelector = ".scramble-on-view",
  className = "",
}: AnimatedScrambleProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = Array.from(
      container.querySelectorAll<HTMLElement>(targetSelector)
    );

    if (!targets.length) return;

    const intervals = new Map<HTMLElement, NodeJS.Timeout>();
    const timeouts = new Map<HTMLElement, NodeJS.Timeout>();
    const originals = new Map<HTMLElement, string>();

    const shuffleString = (str: string): string => {
      const arr = str.split('');
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.join('');
    };

    const stopScramble = (el: HTMLElement) => {
      clearInterval(intervals.get(el));
      clearTimeout(timeouts.get(el));
      const original = originals.get(el);
      if (original) el.textContent = original;
    };

    const startScramble = (el: HTMLElement) => {
      const originalText = originals.get(el) || el.textContent || '';
      originals.set(el, originalText);

      const interval = setInterval(() => {
        el.textContent = shuffleString(originalText);
      }, 100);
      intervals.set(el, interval);

      const timeout = setTimeout(() => {
        stopScramble(el);
      }, 800);
      timeouts.set(el, timeout);
    };

    const isAboveViewport = (el: HTMLElement): boolean => {
      const rect = el.getBoundingClientRect();
      return rect.bottom < 0;
    };

    targets.forEach((el) => {
      const originalText = el.textContent || '';
      originals.set(el, originalText);

      if (isAboveViewport(el)) {
        // Ya está por encima del viewport, mostrar original y visible
        el.style.opacity = "1";
        el.textContent = originalText;
      } else {
        // Elemento aún no observado: oculto
        el.style.opacity = "0";
      }
    });

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            startScramble(el);
            observerInstance.unobserve(el);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -14% 0px",
      }
    );

    targets.forEach((el) => {
      if (!isAboveViewport(el)) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
      targets.forEach((el) => {
        stopScramble(el);
      });
    };
  }, [targetSelector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
