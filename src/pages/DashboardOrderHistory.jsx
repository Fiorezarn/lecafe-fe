import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTableComponent from "@/components/dashboard/DataTables";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import { FaFileCsv } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { CircleCheckBigIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ExpandedRowComponent from "@/components/dashboard/ExpandedRow";

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
      item?.User?.us_fullname,
      item?.or_status_shipping || "",
      item?.or_status_payment || "",
      item?.or_type_order || "",
      item?.or_site || "",
      formatDate(item?.createdAt) || "",
      item?.or_total_price || 0,
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

  if (!RegExp(/^data:text\/csv/i).exec(csv)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}

function DashboardOrderHistory() {
  const { orders, codeOrder, messageOrder } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    dispatch({ type: "order/getAllOrderHistory" });
  }, [dispatch]);

  const data = orders?.data;

  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.or_id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.or_name_recipient,
      sortable: true,
    },
    {
      name: "Shipping Status",
      selector: (row) => row.or_status_shipping,
      sortable: true,
    },
    {
      name: "Payment Status",
      selector: (row) => row.or_status_payment,
      sortable: true,
    },
    {
      name: "Order Type",
      selector: (row) => row.or_type_order,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.or_type_order === "Dine-in",
          style: {
            backgroundColor: "#FBBF24",
          },
        },
        {
          when: (row) => row.or_type_order === "Delivery",
          style: {
            backgroundColor: "#4ADE80",
          },
        },
      ],
    },
    {
      name: "Site",
      selector: (row) => row.or_site,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => formatDate(row.createdAt),
      sortable: true,
    },
    {
      name: "Total Price",
      selector: (row) => formatPrice(row.or_total_price),
      sortable: true,
    },
  ];

  useEffect(() => {
    if (codeOrder) {
      if (codeOrder === 201 || codeOrder === 200) {
        toast({
          description: (
            <div className="flex gap-2 font-bold">
              <CircleCheckBigIcon className="text-green-600" />
              <p>{messageOrder}</p>
            </div>
          ),
          className: cn(
            "top-10 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
        });
      }
    }
  }, [codeOrder, messageOrder]);

  const handleRowExpand = (state) => {
    setExpandedRows(state);
  };

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
        <Button
          className="bg-green-900 text-white font-bold px-4 py-2 rounded"
          onClick={() => downloadCSV(data)}
        >
          <FaFileCsv />
          Export CSV
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow max-w-[154vh]">
        <DataTableComponent
          columns={columns}
          data={data}
          expandable={true}
          expandedRows={expandedRows}
          onRowExpand={handleRowExpand}
          ExpandedComponent={ExpandedRowComponent}
          className="min-w-full"
          responsive={true}
          fixedHeader={true}
          fixedHeaderScrollHeight="calc(100vh - 300px)"
        />
      </div>
    </DashboardLayout>
  );
}

export default DashboardOrderHistory;
