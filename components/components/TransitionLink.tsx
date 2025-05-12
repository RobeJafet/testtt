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

    if (pathname === hrefString) {
      // Mismo path, no hacer nada
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const overlay = document.getElementById("page-loader");
    const body = document.body;
    overlay?.classList.add("visible");
    body.classList.add("loading");

    await sleep(300);
    router.push(hrefString);
  };

  return (
    <Link href={href.toString()} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
};
