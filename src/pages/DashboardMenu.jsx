"use client";

import DataTableComponent from "@/components/dashboard/DataTables";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleCheckBigIcon, CircleX, Pen, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ModalMenu from "@/components/dashboard/ModalMenu";
import { setIsOpen, setProductId, setType } from "@/features/menu/menuSlice";
import { useNavigate } from "react-router-dom";

function DashboardMenu() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { menu, message, code, loading, error, isOpen } = useSelector(
    (state) => state.menu
  );

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        description: (
          <div className="flex items-center gap-2 font-bold">
            <CircleX className="text-white" />
            <p>{error?.message}</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    }
  }, [error, toast]);

  useEffect(() => {
    dispatch({ type: "menu/getAllMenu" });
  }, [dispatch]);

  useEffect(() => {
    if (code) {
      if (code === 201 || code === 200) {
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
  }, [code, message, toast]);

  const handleEdit = (id) => {
    dispatch(setProductId(id));
    dispatch(setIsOpen(true));
    dispatch(setType("edit"));
  };

  const handleCreate = () => {
    dispatch(setIsOpen(true));
    dispatch(setType("create"));
  };

  const handleDelete = (id) => {
    dispatch({ type: "menu/deleteMenu", payload: id });
  };

  const data = menu?.data || [];
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
          <Button size="sm" onClick={() => handleEdit(row.mn_id)}>
            <Pen />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="destructive">
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
                <DialogClose asChild>
                  <Button className="w-full">Cancel</Button>
                </DialogClose>
                <Button
                  onClick={() => handleDelete(row.mn_id)}
                  className="bg-red-600 w-full text-white font-bold"
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
      <h1 className="text-3xl lg:text-4xl mb-6 lg:mb-10 font-bold mt-10 text-earth">
        Menu Management
      </h1>
      <Button className="bg-green-900" onClick={handleCreate}>
        Create Menu
      </Button>
      {isOpen && <ModalMenu />}
      <DataTableComponent columns={columns} data={data} />
    </DashboardLayout>
  );
}

export default DashboardMenu;
