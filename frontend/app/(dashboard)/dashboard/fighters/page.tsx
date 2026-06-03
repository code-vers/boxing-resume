import React from "react";
import { FighterHeader } from "@/components/dashboard/fighters/FighterHeader";
import { FighterFilters } from "@/components/dashboard/fighters/FighterFilters";
import { FighterTable } from "@/components/dashboard/fighters/FighterTable";

/**
 * @page FighterManagementPage
 * @description Administrative page for managing the platform's database of fighters.
 */
export default function FighterManagementPage() {
  return (
    <div className='mx-auto  space-y-6 pb-10'>
      {/* 1. Page Header with Actions */}
      <FighterHeader />

      {/* 2. Search & Filtering Controls */}
      <FighterFilters />

      {/* 3. Data Table */}
      <FighterTable />
    </div>
  );
}
