import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTableComponent from "@/components/dashboard/DataTables";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, formatPrice } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, CircleCheckBigIcon, CircleX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

function DashboardTracking() {
  const { tracking, loading, codeOrder, messageOrder } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "order/trackingOrder" });
  }, [dispatch]);

  const data = tracking?.data;

  const columns = [
    {
      name: "Order-ID",
      selector: (row) => row.or_id,
      sortable: true,
    },
    {
      name: "Receiver",
      selector: (row) => row.User?.us_fullname,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.or_site,
      sortable: true,
    },
    {
      name: "Total Price",
      selector: (row) => formatPrice(row.or_total_price),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="success" className="flex items-center">
              <CheckCircleIcon className="w-4 h-4 mr-2" /> Finish
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to mark this order as finished?
              </DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="w-full">Cancel</Button>
              </DialogClose>
              <Button
                onClick={() =>
                  dispatch({
                    type: "order/updateStatus",
                    payload: { id: row.or_id, status: "delivered" },
                  })
                }
                className="bg-green-600 w-full text-white font-bold flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  "Loading..."
                ) : (
                  <>
                    <CheckCircleIcon className="w-4 h-4 mr-2" /> Finish
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
  ];

  useEffect(() => {
    if (codeOrder) {
      if (codeOrder === 201 || codeOrder === 200) {
        navigate("/dashboard/order");
      } else {
        toast({
          variant: "destructive",
          description: (
            <div className="flex items-center gap-2 font-bold">
              <CircleX className="text-white" />
              <p>{messageOrder}</p>
            </div>
          ),
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
        });
      }
    }
  }, [codeOrder, messageOrder]);

  return (
    <DashboardLayout
      breadcrumbLinks={[
        { id: 1, title: "Dashboard", url: "/dashboard" },
        { id: 2, title: "Tracking", url: "/dashboard/tracking" },
      ]}
    >
      <h1 className="text-3xl lg:text-4xl mb-6 lg:mb-10 font-bold mt-10 text-earth">
        Tracking
      </h1>
      <DataTableComponent columns={columns} data={data} expand />
    </DashboardLayout>
  );
}

export default DashboardTracking;
