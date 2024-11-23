import React, { useState, PropsWithChildren } from "react";
import { CartSVG } from "~/assets/icons/cart";

export const PreOrderButton = ({
  hasIcon,
  fullWidth,
  type,
  children,
  onPress,
}: PropsWithChildren<{
  type: "bae" | "vouv";
  hasIcon?: boolean;
  fullWidth?: boolean;
  onPress: () => void;
}>) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onClick={onPress}
      className={`relative inline-block overflow-hidden ${
        fullWidth ? "w-full md:w-auto" : ""
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <div
          className="absolute bg-white opacity-20 rounded-full pointer-events-none z-30"
          style={{
            top: mousePosition.y,
            left: mousePosition.x,
            width: "80px",
            height: "80px",
            transform: "translate(-50%, -50%)",
            filter: "blur(30px)",
          }}
        />
      )}

      <button
        className={`relative px-4 py-2 md:py-4 bg-white text-black font-semibold rounded-md flex items-center gap-2 md:gap-4 z-10 ${
          type === "bae" ? "hover:bg-bae-primary" : "hover:bg-vouv-primary"
        } hover:text-white ease-in transition-all ${
          fullWidth ? "w-full md:w-auto justify-center py-4" : ""
        }`}
      >
        {hasIcon && <CartSVG width={20} height={20} />}
        {children}
      </button>
    </div>
  );
};
