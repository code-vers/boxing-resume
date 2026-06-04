import { PageHeader } from "@/components/dashboard/page-header";
import { KOMetrics } from "@/components/dashboard/reports/KOMetrics";
import { PeopleDatabase } from "@/components/dashboard/reports/PeopleDatabase";
import { PlatformCharts } from "@/components/dashboard/reports/PlatformCharts";
import { ReportsHeader } from "@/components/dashboard/reports/ReportsHeader";

/**
 * @page ReportsPage
 * @description Comprehensive administrative dashboard for platform-wide statistics, growth tracking, and performance reports.
 */
export default function ReportsPage() {
  return (
    <div className='mx-auto  space-y-8'>
      <PageHeader
        title='STATS & REPORTS'
        description='Platform-wide statistics, KO data, weight class breakdowns, and performance reports.'
      />
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
