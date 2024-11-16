import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTableComponent from "@/components/dashboard/DataTables";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "@/lib/utils";

function convertArrayOfObjectsToCSV(array) {
  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = [
    "Name",
    "Shipping Status",
    "Payment Status",
    "Order Type",
    "Site",
    "Date",
    "Total Price",
  ];

  let result = keys.join(columnDelimiter) + lineDelimiter;

  array.forEach((item) => {
    const row = [
      item.us_fullname,
      item.Order[0]?.or_status_shipping || "",
      item.Order[0]?.or_status_payment || "",
      item.Order[0]?.or_type_order || "",
      item.Order[0]?.or_site || "",
      item.Order[0]?.createdAt || "",
      item.Order[0]?.or_total_price || 0,
    ];
    result += row.join(columnDelimiter) + lineDelimiter;
  });

  return result;
}

function downloadCSV(array) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "OrderHistory.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}

function DashboardOrderHistory() {
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "order/getAllOrderHistory" });
  }, [dispatch]);

  const data = orders?.data;

  const columns = [
    {
      name: "Name",
      selector: (row) => row.us_fullname,
      sortable: true,
    },
    {
      name: "Shipping Status",
      selector: (row) => row.Order[0]?.or_status_shipping,
      sortable: true,
    },
    {
      name: "Payment Status",
      selector: (row) => row.Order[0]?.or_status_payment,
      sortable: true,
    },
    {
      name: "Order Type",
      selector: (row) => row.Order[0]?.or_type_order,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.Order[0]?.or_type_order === "Dine-in",
          style: {
            backgroundColor: "#FBBF24",
          },
        },
        {
          when: (row) => row.Order[0]?.or_type_order === "Delivery",
          style: {
            backgroundColor: "#4ADE80",
          },
        },
      ],
    },
    {
      name: "Site",
      selector: (row) => row.Order[0]?.or_site,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.Order[0]?.createdAt,
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
        Order History
      </h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => downloadCSV(data)}
        >
          Export CSV
        </button>
      </div>
      <DataTableComponent columns={columns} data={data} expand />
    </DashboardLayout>
  );
}

export default DashboardOrderHistory;
