"use client";

import React from "react";
import { cn } from "@/lib/utils";

const weightClasses = [
  "P4P",
  "Heavyweight",
  "Cruiserweight",
  "Light Heavyweight",
  "Super Middleweight",
  "Middleweight",
  "Flyweight",
  "Light Flyweight",
  "Minimumweight",
];

interface RankingTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

/**
 * @component RankingTabs
 * @description Horizontal navigation for switching between weight class rankings.
 */
export function RankingTabs({ activeTab, onTabChange }: RankingTabsProps) {
  return (
    <nav
      aria-label='Weight Classes'
      className='bg-white mt-16 rounded-md shadow-sm overflow-hidden flex whitespace-nowrap overflow-x-auto no-scrollbar'>
      <ul className='flex w-full items-center text-sm font-medium text-slate-600'>
        {weightClasses.map((weight) => (
          <li key={weight} className='relative'>
            <button
              onClick={() => onTabChange(weight)}
              className={cn(
                "inline-block cursor-pointer py-3 px-6 transition-colors",
                activeTab === weight
                  ? "text-[#0A0A0A]"
                  : "text-[#857F78] text-[12px]",
              )}>
              {weight}
            </button>
            {activeTab === weight && (
              <div className='absolute bottom-0 left-0 w-full h-0.5 bg-primary' />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
