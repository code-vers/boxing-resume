import { PageHeader } from "@/components/dashboard/page-header";
import KorateOverview from "@/components/dashboard/admin/overview/KorateOverview";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title='Dashboard Overview'
        description="Welcome back! Here's what's happening with your boxing career today."
      />
      
      <KorateOverview />
    </div>
  );
}
