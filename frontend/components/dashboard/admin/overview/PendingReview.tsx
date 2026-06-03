"use client";

import { pendingReviews } from "@/constants/seed-data";
import { cn } from "@/lib/utils";

/**
 * @component PendingReview
 * @description Displays a list of items awaiting administrative review with category badges.
 * Optimized for equal height to match RecentActivity.
 */
const PendingReview = () => {
  return (
    <section className='flex flex-col h-full' data-purpose='pending-reviews'>
      {/* Header */}
      <div className='px-3 rounded-t-xl pt-2 pb-4 border-2 border-border  flex items-center justify-between'>
        <h2 className='text-[13px] font-bold tracking-wide text-secondary uppercase'>
          Pending Reviews
        </h2>
      </div>

      {/* Reviews List Container - flex-1 and bg-white ensures it fills height */}
      <div className='flex-1 overflow-hidden bg-white border-x-2 border-b-2 border-border rounded-b-xl shadow-sm'>
        <div className='flex flex-col'>
          {pendingReviews.map((review) => (
            <div
              key={review.id}
              className='flex items-center justify-between border-b border-border px-4 py-3 last:border-b-0'>
              <div className='flex items-center gap-4'>
                <span
                  className={cn(
                    "rounded px-2 py-1 text-[10px] font-bold tracking-wider uppercase",
                    review.category === "Fighter" &&
                      "bg-indigo-50 text-indigo-700",
                    review.category === "Result" &&
                      "bg-emerald-50 text-emerald-700",
                    review.category === "Belt" && "bg-red-50 text-red-700",
                    review.category === "User" && "bg-blue-50 text-blue-700",
                  )}>
                  {review.category}
                </span>
                <p className='text-[12px] text-text-primary '>
                  {review.content}
                </p>
              </div>
              <div className='ml-4 flex flex-col items-end gap-1.5'>
                <button className='rounded bg-[#d92d20] px-3 py-1 text-[12px] font-medium text-white transition-colors hover:bg-red-700'>
                  Review
                </button>
                <button className='text-[11px] text-slate-400 transition-colors hover:text-slate-600'>
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PendingReview;
