export const dynamic = "force-dynamic";

import { getDashboardData } from "@/lib/actions/dashboard";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const data = await getDashboardData();

  // Serialize dates for client component (Date objects -> ISO strings via JSON)
  // Next.js handles serialization of plain objects with Date values automatically
  // when passing from server to client components.
  return (
    <DashboardClient
      recentProjects={data.recentProjects}
      stats={data.stats}
      recentSearches={data.recentSearches}
      recentActivity={data.recentActivity}
    />
  );
}
