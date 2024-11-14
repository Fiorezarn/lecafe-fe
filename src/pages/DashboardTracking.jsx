import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTableComponent from "@/components/dashboard/DataTables";
import { useEffect, useState } from "react";
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

  const data =
    tracking?.data?.orders?.Order?.map((order) => ({
      us_fullname: tracking.data.orders.us_fullname,
      or_status_shipping: order.or_status_shipping,
      or_site: order.or_site,
      or_total_price: order.or_total_price,
    })) || [];

  const columns = [
    {
      name: "Receiver",
      selector: (row) => row.us_fullname,
      sortable: true,
    },
    {
      name: "Shipping Status",
      selector: (row) => (
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={row.or_status_shipping} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ongoing">On-Going</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      ),
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
  ];

  return (
    <DashboardLayout
      breadcrumbLinks={[
        { id: 1, title: "Dashboard", url: "/dashboard" },
        { id: 2, title: "Tracking", url: "/dashboard/tracking" },
      ]}
    >
      <DataTableComponent columns={columns} data={data} expand />
    </DashboardLayout>
  );
}

export default DashboardTracking;
