import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navigation/Navbar";
import { useToast } from "@/hooks/use-toast";
import { setIsOpenModal, setMessageOrder } from "@/features/order/orderSlice";
import Pending from "@/components/order/Pending";
import OnGoing from "@/components/order/Ongoing";
import Ordered from "@/components/order/Ordered";
import Failed from "@/components/order/Failed";
import { CircleCheckBigIcon } from "lucide-react";
import Footer from "@/components/navigation/Footer";
import { useLocation, useNavigate } from "react-router-dom";

function Order() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { orderById, messageOrder, transactions, codeOrder } = useSelector(
    (state) => state.order
  );
  const { cookie } = useSelector((state) => state.auth);
  const id = cookie?.us_id;
  const [value, setValue] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const orderIdMidtrans = queryParams.get("order_id");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (orderIdMidtrans && id) {
      dispatch({
        type: "payments/createVerifyPayments",
        payload: { orderIdMidtrans, userId: id },
      });
    }
  }, [orderIdMidtrans, id]);

  useEffect(() => {
    if (messageOrder && codeOrder) {
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
        dispatch(setIsOpenModal(false));
        dispatch(setMessageOrder(null));
      }
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
          if (result?.order_id) {
            navigate(location.pathname + "?order_id=" + result.order_id);
          }
        },
        onPending: (result) => {
          if (result?.order_id) {
            navigate(location.pathname + "?order_id=" + result.order_id);
          }
        },
        onError: (result) => {
          if (result?.order_id) {
            navigate(location.pathname + "?order_id=" + result.order_id);
          }
        },
        onClose: (result) => {
          if (result?.order_id) {
            navigate(location.pathname + "?order_id=" + result.order_id);
          }
          console.log("Payment closed");
        },
      });
    }
  }, [transactions, dispatch, location.pathname, navigate]);

  useEffect(() => {
    if ((value === "" && id) || messageOrder) {
      dispatch({
        type: "order/getOrderByUserId",
        payload: { id, status: "pending" },
      });
    }
  }, [dispatch, id, value, messageOrder]);

  const handleTabChange = (value) => {
    setValue(value);
    dispatch({
      type: "order/getOrderByUserId",
      payload: { id, status: value },
    });
  };

  return (
    <>
      <Navbar />
      <div className="p-4 md:p-10 bg-earth5 h-screen">
        <Tabs
          defaultValue="pending"
          className="w-full h-full"
          onValueChange={handleTabChange}
        >
          <TabsList className="grid w-full grid-cols-4 font-mono">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="ongoing">On-going</TabsTrigger>
            <TabsTrigger value="ordered">Ordered</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <Pending orders={orderById?.orders?.Order} />
          </TabsContent>
          <TabsContent value="ongoing">
            <OnGoing orders={orderById?.orders?.Order} />
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
