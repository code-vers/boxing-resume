"use client";

import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserStatsProps {
  stats: {
    label: string;
    value: string;
    trend: {
      value: string;
      label: string;
      type: "up" | "down";
    };
  }[];
}

/**
 * @component UserStats
 * @description Stat cards row for User Management.
 */
export function UserStats({ stats }: UserStatsProps) {
  return (
    <section className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
      {stats.map((stat, index) => (
        <div
          key={index}
          className='bg-white rounded-lg p-5 shadow-sm border border-gray-100'>
          <h3 className='text-xs font-semibold text-gray-500 tracking-wider mb-2 uppercase'>
            {stat.label}
          </h3>
          <div className='text-3xl font-bold mb-2 font-heading'>
            {stat.value}
          </div>
          <div
            className={cn(
              "text-xs font-medium flex items-center",
              stat.trend.type === "up" ? "text-green-600" : "text-red-500"
            )}>
            {stat.trend.type === "up" ? (
              <ArrowUp className='w-3 h-3 mr-1' />
            ) : (
              <ArrowDown className='w-3 h-3 mr-1' />
            )}
            {stat.trend.value} {stat.trend.label}
          </div>
        </div>
      ))}
    </section>
  );
}
