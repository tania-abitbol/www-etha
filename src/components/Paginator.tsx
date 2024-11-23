import { FC } from "react";
import { motion } from "framer-motion";

interface PaginatorProps {
  totalSlides: number;
  currentSlide: number;
  color: string;
}

export const Paginator: FC<PaginatorProps> = ({
  totalSlides,
  currentSlide,
  color,
}) => {
  return (
    <div className="flex justify-center mt-3">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <motion.div
          key={index}
          animate={{
            width: currentSlide === index ? 12 : 8,
            opacity: currentSlide === index ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
          className={`rounded-full h-2 mx-1 ${color}`}
        />
      ))}
    </div>
  );
};
