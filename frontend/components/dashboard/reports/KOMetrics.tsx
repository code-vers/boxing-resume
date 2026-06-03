"use client";

import { Card } from "@/components/ui/card";
import { statsAndReportsData } from "@/constants/seed-data";

/**
 * @component KOMetrics
 * @description Displays a row of key KO performance metrics in high-impact Oswald typography.
 */
export function KOMetrics() {
  const { metrics } = statsAndReportsData;

  return (
    <Card className='p-6 ' data-purpose='ko-metrics'>
      <h2 className='font-oswald mb-4 text-[18px] text-foreground font-normal tracking-wide uppercase'>
        KO Rate Overview
      </h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {metrics.map((metric, index) => (
          <div
            key={index}
            className='flex flex-col -mt-4 justify-center rounded bg-section-bg p-4'>
            <div className='font-oswald text-3xl font-bold text-red-600'>
              {metric.value}
              {metric.unit}
            </div>
            <div className='mt-1 text-[11px] font-normal tracking-wider text-muted-foreground uppercase'>
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
