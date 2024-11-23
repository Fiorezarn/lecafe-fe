import Navbar from "@/components/navigation/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { setMessageOrder } from "@/features/order/orderSlice";
import { CartItems } from "@/components/order/CartItems";
import { OrderSummary } from "@/components/order/OrderSummary";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { messageOrder, codeOrder } = useSelector((state) => state.order);
  const { cookie } = useSelector((state) => state.auth);
  const userId = cookie?.us_id;

  useEffect(() => {
    if (!cookie) {
      dispatch({ type: "auth/getCookie" });
    }
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch({ type: "cart/getCartByUserId", payload: userId });
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (codeOrder && messageOrder) {
      if (codeOrder !== 201) {
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
        dispatch(setMessageOrder(null));
        return;
      } else {
        navigate("/order");
      }
    }
  }, [codeOrder, messageOrder]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row p-8 gap-8 md:h-screen bg-earth3">
        <CartItems />
        <OrderSummary />
      </div>
    </>
  );
}

export default Cart;
