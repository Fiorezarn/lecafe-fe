import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { formatPrice } from "@/lib/utils";
import { Box, Coffee, TrendingUp, UserRound } from "lucide-react";
import { useEffect } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const StatCard = ({ icon: Icon, title, value, bgColor }) => {
  return (
    <div className="transform transition-all duration-300 hover:scale-105">
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className={`p-4 ${bgColor} rounded-xl`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              {title}
            </h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {value?.toLocaleString() || 0}
            </p>
          </div>
        </div>
        <div className={`h-1 ${bgColor}`} />
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
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
