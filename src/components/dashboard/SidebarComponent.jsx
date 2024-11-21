import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User2, ChevronUp } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLogout } from "@/features/auth/authApi";
import { History, Home, MapPinHouse, Menu } from "lucide-react";

function SidebarComponent() {
  const { cookie } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation(); // Mendapatkan URL saat ini
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "auth/getCookie" });
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const response = await fetchLogout();
      if (response.code === 200) {
        navigate(0);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const items = [
    { title: "Home", url: "/dashboard", icon: Home },
    { title: "Menu Management", url: "/dashboard/menu", icon: Menu },
    { title: "Tracking", url: "/dashboard/tracking", icon: MapPinHouse },
    { title: "Order History", url: "/dashboard/order", icon: History },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-earth2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white text-xl">
            Dashboard Le Café
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-6">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all ${
                        location.pathname === item.url
                          ? "bg-white text-black"
                          : "text-white hover:bg-earth hover:text-white"
                      } ${
                        location.pathname === item.url ? "hover:bg-white" : ""
                      }`}
                    >
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
      <SidebarFooter className="bg-earth2">
        <SidebarMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="text-white">
                <User2 /> {cookie?.us_username}
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="cursor-pointer"
              onClick={handleLogout}
              side="top"
            >
              <DropdownMenuItem>
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SidebarComponent;
