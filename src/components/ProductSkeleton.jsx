import React from "react";

const ProductSkeleton = () => {
  return (
    <div className=" animate-pulse-scale bg-[#1e1e1e] w-[400px] ring-4 ring-[#c09d5b] shadow-lg">
      <div className="w-full h-[300px] bg-gray-300 object-cover" />
      <div className="flex flex-col gap-3 pt-8 px-5">
        <div className="bg-gray-300 w-[50%] h-[20px] rounded-2xl" />
        <div className="bg-gray-300 w-[30%] h-[20px] rounded-2xl" />
      </div>
      <div className="flex justify-center items-center gap-2 mt-8 border-t-2 border-t-[#c09d5b] pt-4 px-5 mb-4">
        <div className="bg-gray-300 w-[60%] h-[20px] rounded-2xl" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
