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
import { formatPrice } from "@/lib/utils";

function DashboardTracking() {
  const { tracking } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "order/trackingOrder" });
  }, [dispatch]);

  const data = tracking?.data;

  const columns = [
    {
      name: "Receiver",
      selector: (row) => row.us_fullname,
      sortable: true,
    },
    {
      name: "Shipping Status",
      selector: (row) => (
        <Select
          onValueChange={(e) =>
            dispatch({
              type: "order/updateStatus",
              payload: { id: row.Order[0]?.or_id, status: e },
            })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={row.Order[0]?.or_status_shipping} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ongoing">On-Going</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      ),
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.Order[0]?.or_site,
      sortable: true,
    },
    {
      name: "Total Price",
      selector: (row) => formatPrice(row.Order[0]?.or_total_price),
      sortable: true,
    },
  ];

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
