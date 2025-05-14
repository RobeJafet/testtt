"use client";
import { useEffect, useRef, ReactNode } from "react";

type AnimatedOnViewProps = {
  children: ReactNode;
  targetSelector?: string;
  enterClass?: string;
  className?: string;
  stagger?: boolean;
  staggerDelay?: number;
  exitDelay?: number;
};

function isAboveViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom < 0;
}

export default function AnimatedOnView({
  children,
  targetSelector = ".animate-target",
  enterClass = "in-view",
  className = "",
  stagger = false,
  staggerDelay = 100,
  exitDelay = 1000,
}: AnimatedOnViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const selectorClass = targetSelector.startsWith(".")
      ? targetSelector.slice(1)
      : targetSelector;

    const childrenTargets = Array.from(
      container.querySelectorAll<HTMLElement>(targetSelector)
    );
    const allTargets = container.classList.contains(selectorClass)
      ? [container, ...childrenTargets]
      : childrenTargets;

    if (!allTargets.length) return;

    const animateTargets = () => {
      allTargets.forEach((el, i) => {
        const delay = stagger ? i * staggerDelay : 0;

        setTimeout(() => {
          el.classList.add(...enterClass.split(" "));
          setTimeout(() => {
            el.classList.remove(...enterClass.split(" "));
            el.classList.remove(selectorClass);
          }, exitDelay);
        }, delay);
      });
    };

    if (isAboveViewport(container)) {
      animateTargets();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateTargets();
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [targetSelector, enterClass, stagger, staggerDelay, exitDelay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
