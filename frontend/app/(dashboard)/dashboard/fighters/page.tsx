"use client";

import React, { useMemo, useState } from "react";
import { FighterHeader } from "@/components/dashboard/fighters/FighterHeader";
import {
  FighterFilterValues,
  FighterFilters,
} from "@/components/dashboard/fighters/FighterFilters";
import { FighterTable } from "@/components/dashboard/fighters/FighterTable";
import { useFighters } from "@/features/fighters/hooks/useFighters";

const initialFilters: FighterFilterValues = {
  search: "",
  division: "all",
  status: "all",
};

/**
 * @page FighterManagementPage
 * @description Administrative page for managing the platform's database of fighters.
 */
export default function FighterManagementPage() {
  const [filters, setFilters] = useState<FighterFilterValues>(initialFilters);
  const { data: apiResponse, isLoading, error } = useFighters();

  const apiFighters = useMemo(() => apiResponse?.data || [], [apiResponse]);

  const divisions = useMemo(
    () => Array.from(new Set(apiFighters.map((fighter) => fighter.division))).sort(),
    [apiFighters]
  );

  const filteredFighters = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();

    return apiFighters.filter((fighter) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          fighter.firstName,
          fighter.lastName,
          fighter.nickname,
          fighter.nationality,
          fighter.division,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesDivision =
        filters.division === "all" || fighter.division === filters.division;

      // Status is missing from the table columns, but returned in the API payload from the database.
      // We filter it dynamically by comparing case-insensitive status values.
      const matchesStatus =
        filters.status === "all" ||
        (fighter.status && fighter.status.toLowerCase() === filters.status.toLowerCase());

      return matchesSearch && matchesDivision && matchesStatus;
    });
  }, [apiFighters, filters]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 bg-red-50 rounded-lg border border-red-200">
        Failed to load fighters. Please check backend connection.
      </div>
    );
  }

  return (
    <div className='mx-auto  space-y-6 pb-10'>
      {/* 1. Page Header with Actions */}
      <FighterHeader />

      {/* 2. Search & Filtering Controls */}
      <FighterFilters values={filters} divisions={divisions} onChange={setFilters} />

      {/* 3. Data Table */}
      <FighterTable fighters={filteredFighters} />
    </div>
  );
}

