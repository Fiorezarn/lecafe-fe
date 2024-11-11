import BreadcrumbComponent from "@/components/dashboard/Breadcrumb";
import SidebarComponent from "@/components/dashboard/SidebarComponent";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, ListOrderedIcon, Menu, User } from "lucide-react";

const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "User", url: "/dashboard/user", icon: User },
  { title: "Menu Management", url: "/dashboard/menu", icon: Menu },
  { title: "Order", url: "/dashboard/order", icon: ListOrderedIcon },
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
