"use client";

import { useEffect } from "react";
import { logEvent } from "firebase/analytics";
import { initializeFirebase, analytics } from "../utils/firebase";

const RedirectPage = () => {
  useEffect(() => {
    initializeFirebase();

    if (analytics) {
      logEvent(analytics, "redirect");
    }

    const timer = setTimeout(() => {
      window.location.href =
        "https://apps.apple.com/fr/app/v%C3%A9rit%C3%A9-ou-v%C3%A9rit%C3%A9/id6480046704";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Redirection...</h1>
      <p>Vous allez être redirigé vers l'application dans quelques secondes.</p>
      <p>
        Si vous n'êtes pas redirigé,
        <a href="https://apps.apple.com/fr/app/v%C3%A9rit%C3%A9-ou-v%C3%A9rit%C3%A9/id6480046704">
          cliquez ici
        </a>
        .
      </p>
    </div>
  );
};

export default RedirectPage;
