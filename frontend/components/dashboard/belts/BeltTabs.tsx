"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type BeltCategory =
  | "World Belts"
  | "Minor Belts"
  | "Vacant Belts"
  | "All Belts";

interface BeltTabsProps {
  activeTab: BeltCategory;
  onTabChange: (tab: BeltCategory) => void;
}

const tabs: BeltCategory[] = [
  "World Belts",
  "Minor Belts",
  "Vacant Belts",
  "All Belts",
];

/**
 * @component BeltTabs
 * @description Primary navigation tabs for belt categories.
 */
export function BeltTabs({ activeTab, onTabChange }: BeltTabsProps) {
  return (
    <div className='bg-white  border-b border-slate-200 -mx-4 md:-mx-8 px-4 md:px-8'>
      <nav className='-mb-px flex space-x-3 '>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "whitespace-nowrap cursor-pointer py-4 px-4 border-b-2 font-semibold text-sm transition-all",
              activeTab === tab
                ? "border-primary text-[#0A0A0A] text-[12px] font-medium"
                : "border-transparent text-[#857F78] font-medium text-[12px]",
            )}>
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}
