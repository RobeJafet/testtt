import Link from "next/link";
import { ReactNode } from "react";

interface LinkWithArrowProps {
  href: string;
  children: ReactNode;
}

export default function LinkWithArrow({ href, children, ...props }: LinkWithArrowProps) {
  return (
    <Link href={href} className="flex gap-4 items-center" {...props}>
      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 7.37516L7.05112 1.4021M13 7.37516L7.05112 13.3482M13 7.37516L1 7.37516" stroke="#2D2D2C" strokeMiterlimit="10" strokeLinecap="square"/>
      </svg>
      <p className="under-custom">
        {children}
      </p>
    </Link>
  );
}