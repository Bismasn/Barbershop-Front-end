import React from "react";

function StarRating({ rating = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`material-symbols-outlined !text-xl select-none ${
            star <= rating ? "text-[#E7B481]" : "text-zinc-700"
          }`}
        >
          {star <= rating ? "star" : "star_outline"}
        </span>
      ))}
    </div>
  );
}

export default StarRating;
