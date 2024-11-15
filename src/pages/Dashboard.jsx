import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Box, Coffee, Menu, UserRound } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const dispatch = useDispatch();
  const { countData } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch({ type: "dashboard/countData" });
  }, [dispatch]);

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
            <p className="text-3xl">{countData?.user}</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-blue-400">
            <Box className="h-12 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Order</h3>
            <p className="text-3xl">{countData?.order}</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-yellow-400">
            <Coffee className="h-12 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Menu</h3>
            <p className="text-3xl">{countData?.menu}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
