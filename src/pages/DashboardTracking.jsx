import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTableComponent from "@/components/dashboard/DataTables";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    })) || [];

  const columns = [
    {
      name: "Receiver",
      selector: (row) => row.us_fullname,
      sortable: true,
    },
    {
      name: "Shipping Status",
      selector: (row) => row.or_status_shipping,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.or_site,
      sortable: true,
    },
    {
      name: "Map",
      selector: (row) => row.or_site,
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
