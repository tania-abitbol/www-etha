"use client";

import React, { useState, useEffect } from "react";

export const ProgressBar = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollTop(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full bg-gray-200 h-4 fixed top-0 left-0 z-50">
      <div
        className={`bg-yellow h-4 ${
          scrollTop === 100 ? "" : "rounded-tr-xl rounded-br-xl"
        }`}
        style={{ width: `${scrollTop}%` }}
      />
    </div>
  );
};
