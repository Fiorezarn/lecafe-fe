import BreadcrumbComponent from "@/components/dashboard/Breadcrumb";
import SidebarComponent from "@/components/dashboard/SidebarComponent";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

function DashboardLayout({ children, breadcrumbLinks }) {
  return (
    <SidebarProvider>
      <SidebarComponent />
      <div className="w-full">
        <div className="w-full h-10 flex items-center gap-6 p-8 bg-earth1">
          <SidebarTrigger className="text-white" />
          <BreadcrumbComponent links={breadcrumbLinks} />
        </div>
        <main className="px-10 py-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;
