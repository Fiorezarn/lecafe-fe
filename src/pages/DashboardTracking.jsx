import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DataTableComponent from "@/components/dashboard/DataTables";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function DashboardTracking() {
  const { tracking } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!tracking) {
      dispatch({ type: "order/trackingOrder" });
    }
  }, [dispatch]);
  // useEffect(() => {
  //   console.log(tracking);
  // }, [tracking]);

  // const columns = [
  //   { name: "Name", selector: (row) => row.mn_name, sortable: true },
  //   { name: "Price", selector: (row) => row.mn_price, sortable: true },
  //   { name: "Category", selector: (row) => row.mn_category, sortable: true },
  //   {
  //     name: "Action",
  //     selector: (row) => (
  //       <div className="gap-2 flex justify-center">
  //         <ModalEditMenu menuId={row.mn_id} />
  //         <Dialog>
  //           <DialogTrigger asChild>
  //             <Button variant="destructive">
  //               <Trash2 />
  //             </Button>
  //           </DialogTrigger>
  //           <DialogContent>
  //             <DialogHeader>
  //               <DialogTitle>
  //                 Are you sure you want to delete the data?
  //               </DialogTitle>
  //             </DialogHeader>
  //             <DialogFooter>
  //               <Button onClick={() => {}}>Cancel</Button>
  //               <Button
  //                 variant="destructive"
  //                 onClick={() =>
  //                   dispatch({ type: "menu/deleteMenu", payload: row.mn_id })
  //                 }
  //                 disabled={loading}
  //               >
  //                 {loading ? "Loading..." : "Delete"}
  //               </Button>
  //             </DialogFooter>
  //           </DialogContent>
  //         </Dialog>
  //       </div>
  //     ),
  //   },
  // ];

  // const data = order?.data;
  return (
    <DashboardLayout
      breadcrumbLinks={[
        { id: 1, title: "Dashboard", url: "/dashboard" },
        { id: 2, title: "Order", url: "/dashboard/order" },
      ]}
    >
      {/* <DataTableComponent columns={columns} data={data} /> */}
    </DashboardLayout>
  );
}

export default DashboardTracking;
