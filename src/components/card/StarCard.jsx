import React from "react";
import StarRating from "../ui/StarRating";

export function StarCard({ testimonial }) {
  if (!testimonial) return null;

  return (
    <div className="bg-[#161618] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-all">
      <div>
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={testimonial.rating || 5} />
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
            {testimonial.role || "Pelanggan"}
          </span>
        </div>
        <p className="text-sm text-zinc-300 italic mb-6 leading-relaxed">
          "{testimonial.review || testimonial.content}"
        </p>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/80">
        <div className="w-9 h-9 rounded-full bg-[#E7B481]/10 text-[#E7B481] flex items-center justify-center font-bold text-sm">
          {(testimonial.name || "U")[0]}
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{testimonial.name || "User"}</h4>
        </div>
      </div>
    </div>
  );
}

export default StarCard;
