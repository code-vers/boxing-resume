"use client";

import React, { useMemo, useState } from "react";
import { BeltTabs, BeltCategory } from "@/components/dashboard/belts/BeltTabs";
import { BeltToolbar } from "@/components/dashboard/belts/BeltToolbar";
import { BeltTable, IBeltRecord } from "@/components/dashboard/belts/BeltTable";

// Mock data based on the provided HTML
const mockBelts: IBeltRecord[] = [
  { id: 1, name: "WBC Silver Middle", org: "WBC", tier: "Intercontinental", division: "Middleweight", heldSince: "Nov 2023", status: "Active" },
  { id: 2, name: "WBA Silver Middle", org: "WBA", tier: "Continental", division: "Welterweight", heldSince: "Nov 2023", status: "Vacant" },
  { id: 3, name: "IBF Silver Middle", org: "IBF", tier: "Continental", division: "Middleweight", heldSince: "Nov 2023", status: "Interim" },
  { id: 4, name: "WBO Silver Middle", org: "WBO", tier: "Intercontinental", division: "Middleweight", heldSince: "Nov 2023", status: "Active" },
  { id: 5, name: "IBO Silver Middle", org: "IBO", tier: "Intercontinental", division: "Welterweight", heldSince: "Nov 2023", status: "Interim" },
  { id: 6, name: "WBF Silver Middle", org: "WBF", tier: "Continental", division: "Welterweight", heldSince: "Nov 2023", status: "Vacant" },
  { id: 7, name: "IBA Silver Middle", org: "IBA", tier: "Continental", division: "Heavyweight", heldSince: "Nov 2023", status: "Active" },
];

/**
 * @page BeltManagementPage
 * @description Administrative page for managing boxing belts across organizations and tiers.
 */
export default function BeltManagementPage() {
  const [activeTab, setActiveTab] = useState<BeltCategory>("World Belts");
  const [orgFilter, setOrgFilter] = useState("All ORG");

  const filteredBelts = useMemo(() => {
    return mockBelts.filter((belt) => {
      // Filter by ORG
      const matchesOrg = orgFilter === "All ORG" || belt.org === orgFilter;
      
      // Filter by Category (Mock logic based on status/tier for demonstration)
      let matchesCategory = true;
      if (activeTab === "Vacant Belts") {
        matchesCategory = belt.status === "Vacant";
      } else if (activeTab === "World Belts") {
        matchesCategory = belt.status !== "Vacant"; // Simple demo logic
      } else if (activeTab === "Minor Belts") {
        matchesCategory = belt.tier === "Continental";
      }
      
      return matchesOrg && matchesCategory;
    });
  }, [orgFilter, activeTab]);

  return (
    <div className="mx-auto space-y-6 pb-10 overflow-hidden">
      {/* 1. Page Header with Title */}
      <div className="mb-6">
        <h1 className="font-bebas text-4xl text-black mb-1 tracking-wider uppercase">
          CHAMPIONSHIP BELTS
        </h1>
        <p className="text-slate-500 text-sm">
          Manage and track all professional boxing titles and their current statuses.
        </p>
      </div>

      {/* 2. Navigation Tabs */}
      <BeltTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* 3. Toolbar (Filter & Add) */}
      <div className="mt-8">
        <BeltToolbar orgFilter={orgFilter} onOrgFilterChange={setOrgFilter} />
      </div>

      {/* 4. Section Title */}
      <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wide mb-4">
        {activeTab} - RECENT RESULTS
      </h2>
      
      {/* 5. Data Table */}
      <BeltTable belts={filteredBelts} />
    </div>
  );
}
