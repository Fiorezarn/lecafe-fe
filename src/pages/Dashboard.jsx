import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { formatPrice } from "@/lib/utils";
import { Box, Coffee, TrendingUp, UserRound } from "lucide-react";
import { useEffect } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const StatCard = ({ icon: Icon, title, value, bgColor }) => {
  return (
    <div className="transform transition-all duration-300 hover:scale-105">
      <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300">
        <div className="p-3 sm:p-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 ${bgColor} rounded-lg shrink-0`}>
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                {title}
              </h3>
              <p className="mt-1 text-sm sm:text-base font-semibold text-gray-900 break-words">
                {typeof value === "number"
                  ? value.toLocaleString()
                  : value || "0"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  const dispatch = useDispatch();
  const { countData } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch({ type: "dashboard/countData" });
  }, [dispatch]);

  const stats = [
    {
      icon: UserRound,
      title: "Total Users",
      value: countData?.user,
      bgColor: "bg-indigo-500",
    },
    {
      icon: Box,
      title: "Total Orders",
      value: countData?.order,
      bgColor: "bg-blue-500",
    },
    {
      icon: Coffee,
      title: "Total Menu Items",
      value: countData?.menu,
      bgColor: "bg-amber-500",
    },
    {
      icon: FaMoneyBill,
      title: "Total Revenue",
      value: formatPrice(countData?.revenue),
      bgColor: "bg-green-500",
    },
  ];

  return (
    <DashboardLayout
      breadcrumbLinks={[{ id: 1, title: "Dashboard", url: "/dashboard" }]}
    >
      <div className="p-3 sm:p-6">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-6">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              bgColor={stat.bgColor}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
