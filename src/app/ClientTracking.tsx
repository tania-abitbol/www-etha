"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation"; // Utilisation de usePathname
import { initializeFirebase, trackEvent } from "~/utils/firebase";

export const ClientTracking = () => {
  const pathname = usePathname(); // Récupère le chemin actuel

  useEffect(() => {
    const { analytics } = initializeFirebase();

    console.log(`[Analytics] Page visited: ${pathname}`);

    if (!analytics) return;

    trackEvent("page_view", { page_path: pathname });
  }, [pathname]); // Déclenche l'effet à chaque changement de chemin

  return null; // Pas besoin de rendre d'élément visuel
};
