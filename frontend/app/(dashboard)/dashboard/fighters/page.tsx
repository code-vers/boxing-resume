"use client";

import React, { useMemo, useState } from "react";
import { FighterHeader } from "@/components/dashboard/fighters/FighterHeader";
import {
  FighterFilterValues,
  FighterFilters,
} from "@/components/dashboard/fighters/FighterFilters";
import { FighterTable } from "@/components/dashboard/fighters/FighterTable";
import { fighters } from "@/constants/seed-data";

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

  const divisions = useMemo(
    () => Array.from(new Set(fighters.map((fighter) => fighter.division))).sort(),
    []
  );

  const filteredFighters = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();

    return fighters.filter((fighter) => {
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

      const matchesStatus =
        filters.status === "all" || fighter.status === filters.status;

      return matchesSearch && matchesDivision && matchesStatus;
    });
  }, [filters]);

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
