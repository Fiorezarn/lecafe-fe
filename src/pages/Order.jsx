import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navigation/Navbar";
import { useToast } from "@/hooks/use-toast";
import { setMessageOrder } from "@/features/order/orderSlice";
import Pending from "@/components/orderStatus/Pending";
import OnGoing from "@/components/orderStatus/Ongoing";
import Ordered from "@/components/orderStatus/Ordered";
import Failed from "@/components/orderStatus/Failed";
import { CircleCheckBigIcon } from "lucide-react";

function Order() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { orderById, messageOrder, transactions } = useSelector(
    (state) => state.order
  );
  const { cookie } = useSelector((state) => state.auth);
  const id = cookie?.us_id;
  const [isOpenTab, setIsOpenTab] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const orderIdMidtrans = queryParams.get("order_id");

  useEffect(() => {
    if (orderIdMidtrans && id) {
      dispatch({
        type: "payments/createVerifyPayments",
        payload: { orderIdMidtrans, userId: id },
      });
    }
  }, [orderIdMidtrans, id]);

  useEffect(() => {
    if (messageOrder) {
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
      dispatch(setMessageOrder(null));
    }
  }, [messageOrder]);

  useEffect(() => {
    const clientKey = import.meta.env.VITE_CLIENT_KEY_MIDTRANS;
    const snapUrl = import.meta.env.VITE_SNAP_URL_MIDTRANS;
    const script = document.createElement("script");
    script.src = snapUrl;
    script.setAttribute("data-client-key", clientKey);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const token = transactions?.token;
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          console.log("Payment success:", result);
        },
        onPending: (result) => {
          console.log("Payment pending:", result);
        },
        onError: (result) => {
          console.log("Payment error:", result);
        },
        onClose: () => {
          console.log("Payment closed");
        },
      });
    }
  }, [transactions]);

  useEffect(() => {
    if (id) {
      dispatch({ type: "order/getOrderByUserId", payload: id });
    }
  }, [id]);

  return (
    <>
      <Navbar navClass={"bg-earth border-gray-200 z-10"} />
      <div className="p-10 bg-earth5 h-screen overflow-y-auto">
        <Tabs
          defaultValue="pending"
          className="w-full"
          onValueChange={(value) => setIsOpenTab(value)}
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="on-going">On-going</TabsTrigger>
            <TabsTrigger value="ordered">Ordered</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <Pending orders={orderById?.orders?.Order} />
          </TabsContent>
          <TabsContent value="on-going">
            <OnGoing isOpenTab={isOpenTab} orders={orderById?.orders?.Order} />
          </TabsContent>
          <TabsContent value="ordered">
            <Ordered orders={orderById?.orders?.Order} />
          </TabsContent>
          <TabsContent value="failed">
            <Failed orders={orderById?.orders?.Order} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Order;
