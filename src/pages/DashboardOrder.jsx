import DashboardLayout from "@/components/dashboard/DashboardLayout";

function DashboardOrder() {
  return (
    <DashboardLayout
      breadcrumbLinks={[
        { id: 1, title: "Dashboard", url: "/" },
        { id: 2, title: "Order", url: "/dashboard/order" },
      ]}
    >
      <h1>ini order</h1>
    </DashboardLayout>
  );
}

export default DashboardOrder;
