import React from "react";

export function HomeServiceCard({ title, description, image, alt }) {
  return (
    <div className="bg-[#2a2a2c] rounded-2xl overflow-hidden flex flex-col min-h-[300px] w-[280px] lg:w-auto lg:flex-1 shrink-0 snap-start">
      <img
        src={image}
        alt={alt || title}
        className="h-60 w-full object-cover"
      />
      <div className="p-4 mt-auto">
        <h4 className="font-bold text-[15px] mb-1">{title}</h4>
        <p className="text-[12px] text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

export default HomeServiceCard;
