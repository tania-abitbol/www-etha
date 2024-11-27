import React, { PropsWithChildren } from "react";

export const BottomBanner = ({ children }: PropsWithChildren) => {
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50 px-4">
      <div className="bg-black bg-opacity-70 backdrop-blur-md text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between w-full max-w-sm sm:max-w-lg md:max-w-4xl lg:max-w-6xl">
        {children}
      </div>
    </div>
  );
};
