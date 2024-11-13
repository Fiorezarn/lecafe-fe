import BreadcrumbComponent from "@/components/dashboard/Breadcrumb";
import DataTableComponent from "@/components/dashboard/DataTables";
import ModalCreateMenu from "@/components/dashboard/createMenu";
import ModalEditMenu from "@/components/dashboard/editMenu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "User", url: "/dashboard/user", icon: User },
  { title: "Menu Management", url: "/dashboard/menu", icon: Menu },
  { title: "Order", url: "/dashboard/user", icon: ListOrderedIcon },
];

function DashboardUser() {
  const { toast } = useToast();
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
    <DashboardLayout
      breadcrumbLinks={[
        { id: 1, title: "Dashboard", url: "/dashboard" },
        { id: 2, title: "User", url: "/dashboard/user" },
      ]}
    >
      <h1 className="text-3xl mb-4">User Management</h1>
      <ModalCreateMenu />
      <DataTableComponent columns={columns} data={data} />
    </DashboardLayout>
  );
}

export default DashboardUser;
