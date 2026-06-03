"use client";

import React from "react";
import { statsAndReportsData } from "@/constants/seed-data";
import { Card } from "@/components/ui/card";

/**
 * @component KOMetrics
 * @description Displays a row of key KO performance metrics in high-impact Oswald typography.
 */
export function KOMetrics() {
  const { metrics } = statsAndReportsData;

  return (
    <Card className='p-6' data-purpose='ko-metrics'>
      <h2 className='font-oswald mb-4 text-sm font-bold tracking-wide uppercase'>
        KO Rate Overview
      </h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {metrics.map((metric, index) => (
          <div
            key={index}
            className='flex flex-col justify-center rounded border border-slate-100 bg-slate-50 p-4'>
            <div className='font-oswald text-3xl font-bold text-red-600'>
              {metric.value}{metric.unit}
            </div>
            <div className='mt-1 text-[10px] font-semibold tracking-wider text-slate-500 uppercase'>
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
