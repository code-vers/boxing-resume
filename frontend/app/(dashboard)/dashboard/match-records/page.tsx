"use client";

import React, { useMemo, useState } from "react";
import { MatchRecordHeader } from "@/components/dashboard/match-records/MatchRecordHeader";
import {
  MatchFilterValues,
  MatchRecordFilters,
} from "@/components/dashboard/match-records/MatchRecordFilters";
import { MatchRecordTable } from "@/components/dashboard/match-records/MatchRecordTable";
import { allFightResults } from "@/constants/seed-data";

const initialFilters: MatchFilterValues = {
  search: "",
  division: "all",
  status: "all",
};

/**
 * @page MatchRecordManagementPage
 * @description Administrative page for managing professional boxing match records.
 */
export default function MatchRecordManagementPage() {
  const [filters, setFilters] = useState<MatchFilterValues>(initialFilters);

  const divisions = useMemo(
    () => Array.from(new Set(allFightResults.map((match) => match.weight))).sort(),
    []
  );

  const filteredMatches = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();

    return allFightResults.filter((match) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          match.winner.firstName,
          match.winner.lastName,
          match.loser.firstName,
          match.loser.lastName,
          match.event.eventName,
          match.title,
          match.weight,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesDivision =
        filters.division === "all" || match.weight === filters.division;

      // Status filtering logic (mocked as seed data doesn't have status yet)
      const matchesStatus = filters.status === "all";

      return matchesSearch && matchesDivision && matchesStatus;
    });
  }, [filters]);

  return (
    <div className="mx-auto space-y-6 pb-10">
      {/* 1. Page Header with Actions */}
      <MatchRecordHeader />

      {/* 2. Search & Filtering Controls */}
      <MatchRecordFilters
        values={filters}
        divisions={divisions}
        onChange={setFilters}
      />

      {/* 3. Data Table */}
      <MatchRecordTable matches={filteredMatches} />
    </div>
  );
}
