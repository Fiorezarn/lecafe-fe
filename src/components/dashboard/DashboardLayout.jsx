import BreadcrumbComponent from "@/components/dashboard/Breadcrumb";
import SidebarComponent from "@/components/dashboard/SidebarComponent";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { History, Home, MapPinHouse, Menu } from "lucide-react";

const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Menu Management", url: "/dashboard/menu", icon: Menu },
  { title: "Tracking", url: "/dashboard/tracking", icon: MapPinHouse },
  { title: "Order History", url: "/dashboard/order", icon: History },
];
function DashboardLayout({ children, breadcrumbLinks }) {
  return (
    <SidebarProvider>
      <SidebarComponent items={items} />
      <div className="w-full">
        <div className="w-full h-10 flex items-center gap-6 p-8 bg-earth1">
          <SidebarTrigger />
          <BreadcrumbComponent links={breadcrumbLinks} />
        </div>
        <main className="px-10 py-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;
