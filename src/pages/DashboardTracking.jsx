import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn, formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, CircleX } from "lucide-react";
import DataTableComponent from "@/components/dashboard/DataTables";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import ExpandedRowComponent from "@/components/dashboard/ExpandedRow";

function DashboardTracking() {
  const { tracking, loading, codeOrder, messageOrder } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState([]);

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
      selector: (row) => row.or_name_recipient,
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
        <Dialog className="mt-6">
          <DialogTrigger asChild>
            <Button size="sm" variant="success" className="flex items-center">
              <CheckCircleIcon className="w-4 h-4 mr-2" /> Finish
            </Button>
          </DialogTrigger>
          <DialogContent className="px-6">
            <DialogHeader>
              <DialogTitle className="mt-4">
                Are you sure you want to mark this order as finished?
              </DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <div className="flex w-full gap-2">
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
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
  ];

  const handleRowExpand = (state) => {
    setExpandedRows(state);
  };

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
      <div className="bg-white rounded-lg shadow">
        <DataTableComponent
          columns={columns}
          data={data}
          expandable={true}
          expandedRows={expandedRows}
          onRowExpand={handleRowExpand}
          ExpandedComponent={ExpandedRowComponent}
        />
      </div>
    </DashboardLayout>
  );
}

export default DashboardTracking;
