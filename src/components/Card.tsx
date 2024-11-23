import { useState } from "react";

type CardProps = {
  state: "bae" | "vouv";
  content: string;
};
export const Card = ({ state, content }: CardProps) => {
  const [lightPosition, setLightPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLightPosition({ x, y });

    // Rotation pour l'effet 3D
    const rotateX = (y / rect.height - 0.5) * 20;
    const rotateY = (x / rect.width - 0.5) * 20;
    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className={`relative w-full h-56 ${
        state === "bae" ? "bg-white" : "bg-vouv-primaryDark"
      } rounded-xl overflow-hidden shadow-lg transition-transform duration-500 ease-out cursor-pointer`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
    >
      {/* Effet de lumière, visible uniquement au survol */}
      {isHovered && (
        <div
          className={`absolute w-24 h-24 ${
            state === "bae" ? "bg-bae-primary" : "bg-vouv-primary"
          } opacity-10 rounded-full pointer-events-none`}
          style={{
            top: lightPosition.y,
            left: lightPosition.x,
            transform: "translate(-50%, -50%)",
            filter: "blur(30px)",
          }}
        />
      )}

      <div
        className={`p-5 text-center ${
          state === "bae" ? "text-bae-primary" : "text-white"
        } relative z-10 h-full items-center justify-center flex`}
      >
        <h2 className="text-base font-semibold font-baloo">{content}</h2>
      </div>
    </div>
  );
};
