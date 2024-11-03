import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSubItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  ChevronUp,
  Home,
  ListOrderedIcon,
  Menu,
  User,
  User2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import ModalCreateMenu from "@/components/modal/createMenu";
const BASE_URL = import.meta.env.VITE_BASE_URL_BE;

function Dashboard() {
  const dispatch = useDispatch();
  const { menu, error } = useSelector((state) => state.menu);
  useEffect(() => {
    dispatch({ type: "menu/getAllMenu" });
  }, [dispatch]);

  const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "User",
      url: "#",
      icon: User,
    },
    {
      title: "Menu Management",
      url: "#",
      icon: Menu,
    },
    {
      title: "Order",
      url: "#",
      icon: ListOrderedIcon,
    },
  ];
  const data = menu?.data;
  const columns = [
    {
      name: "Image",
      selector: (row) => {
        return (
          <img
            className="w-20 h-20"
            src={`${row.mn_image}`}
            alt={row.mn_name}
          />
        );
      },
    },
    {
      name: "Name",
      selector: (row) => row.mn_name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.mn_price,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.mn_desc,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.mn_category,
      sortable: true,
    },
    {
      name: "Active",
      selector: (row) => row.is_deleted,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <>
            <div className="flex gap-2">
              <Button variant="destructive">Edit</Button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent className="bg-slate-300">
          <SidebarGroup>
            <SidebarGroupLabel className="text-white text-xl">
              Dashboard Le Café
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuSubItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuSubItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <div className="w-full">
        <div className="w-full h-10 flex items-center justify-between p-8 bg-earth4">
          <div className="flex items-center">
            <SidebarTrigger className="hover:bg-earth4" />
            <Breadcrumb className="px-10">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/menu">Menu</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-6">
            {/* <AvatarNav />
            <CartNav /> */}
          </div>
        </div>
        <main className="px-10 py-6">
          <h1 className="text-3xl mb-4">Menu Management</h1>
          <ModalCreateMenu />
          <div
            className="overflow-auto"
            style={{ maxHeight: "450px", maxWidth: "1040px" }}
          >
            <DataTable
              className="border"
              columns={columns}
              data={data}
              responsive={true}
              fixedHeader
              fixedHeaderScrollHeight="450px"
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Dashboard;
