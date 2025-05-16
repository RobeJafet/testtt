"use client";
import Link, { LinkProps } from "next/link";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  className,
  ...props
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const hrefString = href.toString();

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
      return;
    }

    if (pathname === hrefString) {
      e.preventDefault();
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    
      return;
    }
    e.preventDefault();
    const overlay = document.getElementById("page-loader");
    const body = document.body;
    const header = document.querySelector("header");


    overlay?.classList.add("visible");
    header?.classList.add("no-touch");
    body.classList.add("loading");

    const elements = document.querySelectorAll<HTMLElement>(".logo-header");

    startScramble(elements[0]);

    await sleep(300);
    router.push(hrefString);
  };


  function shuffleString(str: string): string {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }

  function startScramble(el: HTMLElement) {
    const originalText = el.getAttribute('data-original-text') || el.textContent || '';
    el.setAttribute('data-original-text', originalText);
    el.textContent = shuffleString(originalText);
  
    const interval = setInterval(() => {
      el.textContent = shuffleString(originalText);
    }, 200);
    el.dataset.intervalId = interval.toString();
  }

  return (
    <Link href={href.toString()} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
};
