"use client";

import { recentActivities } from "@/constants/seed-data";
import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import Link from "next/link";

/**
 * @component RecentActivity
 * @description Displays a list of recent administrative actions with status indicators.
 * Optimized for equal height and fixed border alignment.
 */
const RecentActivity = () => {
  return (
    <section className='flex flex-col h-full' data-purpose='recent-activity'>
      {/* Header */}
      <div className='px-3  rounded-t-xl pt-2 pb-4 border-2 border-border  flex items-center justify-between'>
        <h2 className='text-[13px]  font-bold tracking-wide text-secondary uppercase'>
          Recent Activity
        </h2>
        <Link
          href='#'
          className='flex items-center gap-1 text-[13px] font-medium text-red-600 transition-colors hover:text-red-700'>
          View all
          <MoveRight className='h-3.5 w-3.5' />
        </Link>
      </div>

      {/* Activity List Container - flex-1 and bg-white ensures it fills height */}
      <div className='flex-1 flex flex-col overflow-hidden bg-white border-x-2 border-b-2 border-border rounded-b-xl shadow-sm'>
        <div className='flex-1'>
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className='flex items-center justify-between border-b border-border px-4 py-3.5 last:border-b-0'>
              <div className='flex items-start gap-3'>
                {/* Status Dot */}
                <div
                  className={cn(
                    "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                    activity.type === "fighter" && "bg-red-500",
                    activity.type === "result" && "bg-emerald-500",
                    activity.type === "belt" && "bg-amber-500",
                    activity.type === "user" && "bg-blue-600",
                    activity.type === "system" && "bg-slate-400",
                  )}
                />
                <div>
                  <p className='text-[12px] font-normal  leading-tight text-[#0A0A0A]'>
                    {activity.content}
                  </p>
                  <p className='mt-0.5 text-[12px] text-text-placeholder'>
                    {activity.user}
                  </p>
                </div>
              </div>
              <span className='ml-4 whitespace-nowrap text-[12px] text-text-placeholder'>
                {activity.timestamp}
              </span>
            </div>
          ))}
        </div>

        {/* Load More Button - Fixed border misalignment */}
        <div className='border-t-2 border-border bg-white py-4 text-center mt-auto'>
          <button className='text-[13px] font-medium text-red-600 transition-colors hover:text-red-700'>
            Load more
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentActivity;
