"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type BeltCategory = "World Belts" | "Minor Belts" | "Vacant Belts" | "All Belts";

interface BeltTabsProps {
  activeTab: BeltCategory;
  onTabChange: (tab: BeltCategory) => void;
}

const tabs: BeltCategory[] = ["World Belts", "Minor Belts", "Vacant Belts", "All Belts"];

/**
 * @component BeltTabs
 * @description Primary navigation tabs for belt categories.
 */
export function BeltTabs({ activeTab, onTabChange }: BeltTabsProps) {
  return (
    <div className="bg-white border-b border-slate-200 -mx-4 md:-mx-8 px-4 md:px-8">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm transition-all",
              activeTab === tab
                ? "border-primary text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            )}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}
