import DataTableComponent from "@/components/dashboard/DataTables";
import { useEffect, useState } from "react";
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
import { cn, formatPrice } from "@/lib/utils";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ModalMenu from "@/components/dashboard/ModalMenu";
import {
  setIsOpen,
  setProductId,
  setType,
  setPage,
  setLimit,
  setSearch,
  setCategory,
  setMessage,
} from "@/features/menu/menuSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

function DashboardMenu() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const {
    menu,
    message,
    code,
    loading,
    error,
    isOpen,
    limit,
    page,
    totalItems,
    search,
    category,
  } = useSelector((state) => state.menu);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
    if (category === "all") {
      dispatch(setCategory(""));
    }
    dispatch({
      type: "menu/getAllMenu",
      payload: { page, limit, search, category },
    });
  }, [dispatch, page, limit, search, category]);

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
        setDeleteOpen(false);
        setMessage(null);
      }
    }
  }, [code, message]);

  const handleEdit = (id) => {
    dispatch(setProductId(id));
    dispatch(setIsOpen(true));
    dispatch(setType("edit"));
  };

  const handleCreate = () => {
    dispatch(setIsOpen(true));
    dispatch(setType("create"));
  };

  const handleDelete = () => {
    if (selectedId) {
      dispatch({ type: "menu/deleteMenu", payload: selectedId });
      setSelectedId(null);
      setDeleteOpen(false);
    }
  };

  const handleDeleteOpen = (id) => {
    setSelectedId(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setSelectedId(null);
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleLimitChange = (newLimit) => {
    dispatch(setLimit(newLimit));
  };

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleCategorySubmit = (value) => {
    dispatch(setCategory(value));
  };

  const data = menu?.data || [];
  const columns = [
    {
      name: "No",
      selector: (_, index) => (page - 1) * limit + index + 1,
      sortable: false,
      width: "50px",
    },
    {
      name: "Image",
      selector: (row) => (
        <div className="py-2">
          <img
            className="w-16 h-16 object-cover rounded-lg"
            src={`${row.mn_image}`}
            alt={row.mn_name}
          />
        </div>
      ),
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => (
        <div className="font-medium truncate max-w-[150px]">{row.mn_name}</div>
      ),
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => (
        <div className="font-medium">{formatPrice(row.mn_price)}</div>
      ),
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => {
        const bgColor =
          row.mn_category.toLowerCase() === "coffee"
            ? "bg-yellow-500"
            : row.mn_category.toLowerCase() === "non-coffee"
            ? "bg-blue-500"
            : row.mn_category.toLowerCase() === "food"
            ? "bg-green-500"
            : "bg-gray-500";

        return (
          <span
            className={`inline-block capitalize ${bgColor} rounded-full text-xs font-semibold text-white px-2.5 py-1`}
          >
            {row.mn_category}
          </span>
        );
      },
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex gap-1.5">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handleEdit(row.mn_id)}
          >
            <Pen className="h-4 w-4" />
          </Button>
          <Dialog
            open={deleteOpen}
            onOpenChange={(open) => {
              open ? handleDeleteOpen(row.mn_id) : handleDeleteClose();
            }}
          >
            <DialogTrigger asChild>
              <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
                <Trash2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete Menu Item</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete this menu item? This action
                cannot be undone.
              </p>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <DialogClose asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleDelete}
                  variant="destructive"
                  className="w-full sm:w-auto"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ),
      width: "120px",
    },
  ];

  return (
    <DashboardLayout
      breadcrumbLinks={[
        { id: 1, title: "Dashboard", url: "/dashboard" },
        { id: 2, title: "Menu", url: "/dashboard/menu" },
      ]}
    >
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold text-earth">
          Menu Management
        </h1>

        {isOpen && <ModalMenu />}

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <Button
            className="bg-green-900 hover:bg-green-800 w-full sm:w-auto"
            onClick={handleCreate}
          >
            Create Menu
          </Button>

          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={category} onValueChange={handleCategorySubmit}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="coffee">Coffee</SelectItem>
                  <SelectItem value="non-coffee">Non-Coffee</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Input
              type="text"
              placeholder="Search menu..."
              value={search}
              onChange={(e) => handleSearch(e)}
              className="w-full sm:w-[200px]"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <DataTableComponent
            columns={columns}
            data={data}
            pagination
            paginationServer
            onChangePage={handlePageChange}
            totalRows={totalItems}
            onChangeRowsPerPage={handleLimitChange}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardMenu;
