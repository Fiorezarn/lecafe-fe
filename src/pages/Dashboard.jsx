import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Box, UserRound } from "lucide-react";

function Dashboard() {
  return (
    <DashboardLayout
      breadcrumbLinks={[{ id: 1, title: "Dashboard", url: "/dashboard" }]}
    >
      <div className="flex space-x-4">
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-green-400">
            <UserRound className="h-12 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total User</h3>
            <p className="text-3xl">12,768</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-blue-400">
            <Box className="h-12 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Order</h3>
            <p className="text-3xl">39,265</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
