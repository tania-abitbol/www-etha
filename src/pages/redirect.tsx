"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { logEvent } from "firebase/analytics";
import { initializeFirebase, analytics } from "../utils/firebase";

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    initializeFirebase();

    if (analytics) {
      logEvent(analytics, "redirect");
    }

    const timer = setTimeout(() => {
      router.push(
        "https://apps.apple.com/fr/app/v%C3%A9rit%C3%A9-ou-v%C3%A9rit%C3%A9/id6480046704"
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <p>Vous allez être redirigé...</p>
    </div>
  );
};

export default RedirectPage;
