"use client";

import { dashboardOverview } from "@/constants/seed-data";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

/**
 * @component KorateOverview
 * @description A pixel-perfect dashboard overview component displaying key metrics with trends.
 * Uses Oswald for headings and Inter for body text as per design requirements.
 */
const KorateOverview = () => {
  const { title, stats } = dashboardOverview;

  return (
    <section className='mx-auto rounded-lg border-2 border-card-border bg-section-bg p-6'>
      {/* Section Header */}
      <header className='mb-6'>
        <h2 className='text-[13px] font-bold tracking-widest text-secondary uppercase'>
          {title}
        </h2>
      </header>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat, index) => (
          <article
            key={`${stat.label}-${index}`}
            className='flex h-48 flex-col justify-between rounded-lg border-2 border-card-border bg-card p-5'>
            <div>
              <h3 className='mb-2 text-[11px] tracking-wider text-text-placeholder uppercase'>
                {stat.label}
              </h3>
              <p className='font-heading py-2 text-text-primary mb-3 text-4xl font-bold'>
                {stat.value}
              </p>

              {/* Trend Indicator */}
              {stat.trend && (
                <div
                  className={cn(
                    "flex items-center text-[11px] font-medium",
                    stat.trend.type === "up" && "text-emerald-600",
                    stat.trend.type === "down" && "text-btn-primary",
                    stat.trend.type === "stable" && "text-text-placeholder",
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
            <div className='mt-4 px-3 py-2 flex items-center border border-card-border rounded text-xs text-text-placeholder'>
              <span
                className='mr-2 text-lg'
                role='img'
                aria-label={stat.source}>
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
