"use client";

import React from "react";
import { dashboardOverview } from "@/constants/seed-data";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * @component KorateOverview
 * @description A pixel-perfect dashboard overview component displaying key metrics with trends.
 * Uses Oswald for headings and Inter for body text as per design requirements.
 */
const KorateOverview = () => {
  const { title, stats } = dashboardOverview;

  return (
    <section className='mx-auto max-w-[1200px] rounded-lg border border-slate-200 bg-white p-6 shadow-sm'>
      {/* Section Header */}
      <header className='mb-6'>
        <h2 className='font-oswald text-sm font-semibold tracking-wider text-slate-900 uppercase'>
          {title}
        </h2>
      </header>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat, index) => (
          <article
            key={`${stat.label}-${index}`}
            className='flex h-48 flex-col justify-between rounded-lg border border-slate-200 bg-white p-4'>
            <div>
              <h3 className='mb-2 text-[11px] font-semibold tracking-wide text-slate-400 uppercase'>
                {stat.label}
              </h3>
              <p className='font-oswald mb-3 text-4xl font-semibold text-slate-900'>
                {stat.value}
              </p>

              {/* Trend Indicator */}
              {stat.trend && (
                <div
                  className={cn(
                    "flex items-center text-[11px] font-medium",
                    stat.trend.type === "up" && "text-emerald-500",
                    stat.trend.type === "down" && "text-red-500",
                    stat.trend.type === "stable" && "text-slate-400"
                  )}>
                  {stat.trend.type === "up" && (
                    <ArrowUp className='mr-1 h-3 w-3' />
                  )}
                  {stat.trend.type === "down" && (
                    <ArrowDown className='mr-1 h-3 w-3' />
                  )}
                  {stat.trend.type === "stable" && (
                    <Minus className='mr-1 h-3 w-3' />
                  )}
                  <span>
                    {stat.trend.value} {stat.trend.label}
                  </span>
                </div>
              )}
            </div>

            {/* Source Footer */}
            <div className='mt-4 flex items-center border-t border-slate-200 pt-3 text-xs text-slate-400'>
              <span className='mr-2 text-lg' role='img' aria-label={stat.source}>
                {stat.icon}
              </span>
              <span>{stat.source}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default KorateOverview;
