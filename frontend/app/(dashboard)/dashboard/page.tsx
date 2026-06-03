import { PageHeader } from "@/components/dashboard/page-header";
import KorateOverview from "@/components/dashboard/admin/overview/KorateOverview";
import RecentActivity from "@/components/dashboard/admin/overview/RecentActivity";
import PendingReview from "@/components/dashboard/admin/overview/PendingReview";

export default function DashboardPage() {
  return (
    <div className='space-y-8'>
      <PageHeader
        title='Dashboard Overview'
        description="Welcome back! Here's what's happening with your boxing career today."
      />

      {/* Primary Statistics Overview */}
      <KorateOverview />

      {/* Activity and Reviews Grid */}
      <div className='mx-auto grid  grid-cols-1 gap-6 lg:grid-cols-2'>
        <RecentActivity />
        <PendingReview />
      </div>
    </div>
  );
}
