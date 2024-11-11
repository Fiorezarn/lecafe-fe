import BreadcrumbComponent from "@/components/dashboard/Breadcrumb";
import DataTableComponent from "@/components/dashboard/DataTables";
import ModalCreateMenu from "@/components/modal/createMenu";
import ModalEditMenu from "@/components/modal/editMenu";
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
import { CircleCheckBigIcon, CircleX, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

function DashboardMenu() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { menu, message, code, loading } = useSelector((state) => state.menu);

  useEffect(() => {
    if (!menu) {
      dispatch({ type: "menu/getAllMenu" });
    }
  }, [dispatch]);

  useEffect(() => {
    if (code) {
      if (code === 201) {
        toast({
          description: (
            <div className="flex gap-2 font-bold">
              <CircleCheckBigIcon className="text-green-600" />
              <p>{message}</p>
            </div>
          ),
          className: cn(
            "top-10 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
        });
      } else {
        toast({
          variant: "destructive",
          description: (
            <div className="flex items-center gap-2 font-bold">
              <CircleX className="text-white" />
              <p>{message}</p>
            </div>
          ),
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
        });
      }
    }
  }, [code, message]);

  const data = menu?.data;
  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img className="w-20 h-20" src={`${row.mn_image}`} alt={row.mn_name} />
      ),
    },
    { name: "Name", selector: (row) => row.mn_name, sortable: true },
    { name: "Price", selector: (row) => row.mn_price, sortable: true },
    { name: "Category", selector: (row) => row.mn_category, sortable: true },
    {
      name: "Action",
      selector: (row) => (
        <div className="gap-2 flex justify-center">
          <ModalEditMenu menuId={row.mn_id} />
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
                  onClick={() =>
                    dispatch({ type: "menu/deleteMenu", payload: row.mn_id })
                  }
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Delete"}
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
        { id: 2, title: "Menu", url: "/dashboard/menu" },
      ]}
    >
      <h1 className="text-3xl mb-4">Menu Management</h1>
      <ModalCreateMenu />
      <DataTableComponent columns={columns} data={data} />
    </DashboardLayout>
  );
}

export default DashboardMenu;
