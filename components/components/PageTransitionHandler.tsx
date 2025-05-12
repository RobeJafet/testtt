'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function PageTransitionHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const overlay = document.getElementById('page-loader');
    const body = document.body;

    if (!overlay) return;

    overlay.classList.remove('visible');
    body.classList.remove('loading');

  }, [pathname]); // se dispara en cada ruta nueva

  return null;
}
