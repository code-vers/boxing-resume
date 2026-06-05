"use client";

import React, { useMemo, useState } from "react";
import { RankingTabs } from "@/components/dashboard/rankings/RankingTabs";
import { RankingToolbar } from "@/components/dashboard/rankings/RankingToolbar";
import { RankingTable } from "@/components/dashboard/rankings/RankingTable";
import { topRankings } from "@/constants/seed-data";

/**
 * @page RankingManagementPage
 * @description Administrative page for managing world rankings across all weight divisions.
 */
export default function RankingManagementPage() {
  const [activeTab, setActiveTab] = useState("P4P");
  const [search, setSearch] = useState("");

  const filteredRankings = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return topRankings.filter((row) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [row.fighter.firstName, row.fighter.lastName, row.fighter.nickname]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesDivision = activeTab === "P4P" || row.division === activeTab;

      return matchesSearch && matchesDivision;
    });
  }, [search, activeTab]);

  return (
    <div className='mx-auto space-y-6 pb-10 overflow-x-hidden'>
      {/* 1. Page Header with Title */}
      <header className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 tracking-tight uppercase font-heading'>
          Belts & Titles
        </h1>
        <p className='text-sm text-gray-500 mt-1'>
          Manage weight class rankings and pound-for-pound list.
        </p>
      </header>

      {/* 2. Weight Class Navigation Tabs */}
      <RankingTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 3. Actions Toolbar (Search & Add) */}
      <RankingToolbar search={search} onSearchChange={setSearch} />

      {/* 4. Section Heading */}
      <header className='mb-4 mt-12'>
        <h2 className='text-2xl font-oswald font-medium text-[24px] uppercase tracking-wide text-[#0A0A0A]'>
          {activeTab === "P4P" ? "POUND-FOR-POUND" : activeTab} - RECENT RESULTS
        </h2>
      </header>

      {/* 5. Data Table */}
      <RankingTable rankings={filteredRankings} />
    </div>
  );
}
