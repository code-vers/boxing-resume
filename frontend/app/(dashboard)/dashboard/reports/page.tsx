import React from "react";
import { ReportsHeader } from "@/components/dashboard/reports/ReportsHeader";
import { KOMetrics } from "@/components/dashboard/reports/KOMetrics";
import { PlatformCharts } from "@/components/dashboard/reports/PlatformCharts";
import { PeopleDatabase } from "@/components/dashboard/reports/PeopleDatabase";

/**
 * @page ReportsPage
 * @description Comprehensive administrative dashboard for platform-wide statistics, growth tracking, and performance reports.
 */
export default function ReportsPage() {
  return (
    <div className='mx-auto  space-y-8'>
      {/* 1. Header & Filters */}
      <ReportsHeader />

      {/* 2. Key Metrics Row */}
      <KOMetrics />

      {/* 3. Growth & Distribution Charts */}
      <PlatformCharts />

      {/* 4. Personnel Data Table */}
      <PeopleDatabase />
    </div>
  );
}
