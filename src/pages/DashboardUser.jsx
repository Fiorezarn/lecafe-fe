import BreadcrumbComponent from "@/components/dashboard/Breadcrumb";
import DataTableComponent from "@/components/dashboard/DataTables";
import ModalCreateMenu from "@/components/modal/createMenu";
import ModalEditMenu from "@/components/modal/editMenu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Home, ListOrderedIcon, Menu, Trash2, User } from "lucide-react";
import SidebarComponent from "@/components/dashboard/SidebarComponent";
import { SidebarProvider } from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "User", url: "/dashboard/user", icon: User },
  { title: "Menu Management", url: "/dashboard/menu", icon: Menu },
  { title: "Order", url: "#", icon: ListOrderedIcon },
];

function DashboardUser() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      dispatch({ type: "user/getAllUser" });
    }
  }, [dispatch]);

  const data = user?.data;
  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.us_fullname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.us_email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.us_role,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.us_phonenumber,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="gap-2 flex justify-center">
          <ModalEditMenu menuId={row.us_id} />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete the data?
                </DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => {}}>Cancel</Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    dispatch({
                      type: "user/deleteUser",
                      payload: row.us_id,
                    });
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ),
    },
  ];

  return (
    <SidebarProvider>
      <SidebarComponent items={items} />
      <div className="w-full">
        <div className="w-full h-10 flex items-center justify-between p-8 bg-earth4">
          <BreadcrumbComponent
            links={[
              { id: 1, title: "Home", url: "/" },
              { id: 2, title: "Menu", url: "/menu" },
            ]}
          />
        </div>
        <main className="px-10 py-6">
          <h1 className="text-3xl mb-4">User Management</h1>
          <ModalCreateMenu />
          <DataTableComponent columns={columns} data={data} />
        </main>
      </div>
    </SidebarProvider>
  );
}

export default DashboardUser;
