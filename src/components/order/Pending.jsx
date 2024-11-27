import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ClockIcon, Loader2, MessageCircleX, Wallet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import NoData from "@/components/order/NoData";
import AccordionSkeleton from "./AccordionSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import PaymentInfo from "./PaymentInfo";
import { setIsOpenModal } from "@/features/order/orderSlice";
import PropTypes from "prop-types";

function Pending({ orders }) {
  const dispatch = useDispatch();
  const { cookie } = useSelector((state) => state.auth);
  const { loading, isOpen } = useSelector((state) => state.order);
  const cancelPayments = (id) => {
    const userId = cookie?.us_id;
    dispatch({
      type: "payments/cancelPayments",
      payload: { id: id, userId: userId },
    });
  };

  const handlePayment = (id, amount) => {
    const email = cookie?.us_email;
    dispatch({
      type: "payments/createPayments",
      payload: { email, amount, id },
    });
  };

  const handleModalCancel = () => {
    dispatch(setIsOpenModal(true));
  };

  const handleModalClose = () => {
    dispatch(setIsOpenModal(false));
  };

  if (loading) {
    return (
      <div className="space-y-4 h-[80vh]">
        {[...Array(3)].map((_, index) => (
          <AccordionSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0)
    return (
      <div className="h-[80vh] items-center flex justify-center">
        <NoData
          title={"No Pending Orders"}
          paragraph={
            "You currently have no orders in a pending status. All orders have been processed."
          }
        />
      </div>
    );

  return orders.map((item, index) => {
    const detailMenu = JSON.parse(item.OrderDetail[0].od_mn_json);
    const menus = detailMenu.filter((menu) => menu.id !== "SHIPPING");
    const shipping = detailMenu.filter((menu) => menu.id === "SHIPPING");

    return (
      <Accordion key={index} type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex justify-between items-center w-full p-4 bg-yellow-100 rounded-lg shadow-sm">
              <h1 className="text-sm lg:text-2xl font-semibold text-yellow-800 flex items-center gap-2">
                <ClockIcon className="w-6 h-6 text-xs lg:text-xl text-yellow-600" />
                ORDER-{item.or_id}
              </h1>
              <p className="text-gray-700 text-xs lg:text-xl">
                {formatDate(item.createdAt)}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-earth6 rounded-lg shadow-md border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Order Items</h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {menus.map((menu, index) => (
                        <div key={index} className="group">
                          <div className="flex md:flex-row flex-col p-4 rounded-lg md:justify-between md:items-center bg-earth4/30 transition-all duration-300 hover:bg-earth4/50">
                            <div className="flex items-center gap-4">
                              <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                                <img
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  src={menu?.image}
                                  alt={menu?.name || "Menu item"}
                                />
                              </div>
                              <div>
                                <h4 className="text-earth font-medium text-lg md:text-xl truncate max-w-[200px]">
                                  {menu?.name}
                                </h4>
                                <p className="text-earth1 text-sm md:text-base mt-1">
                                  {formatPrice(menu?.price)} x {menu?.quantity}
                                </p>
                              </div>
                            </div>
                            <p className="text-earth2 text-base md:text-lg font-medium flex-shrink-0 text-end">
                              {formatPrice(menu?.price * menu?.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 text-lg">Order Summary</h3>
                  <PaymentInfo
                    item={item}
                    shipping={shipping}
                    isPaymentMethod={false}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                <Dialog
                  open={isOpen}
                  onOpenChange={(open) =>
                    open ? handleModalCancel() : handleModalClose()
                  }
                >
                  <DialogTrigger asChild>
                    <Button
                      onClick={handleModalCancel}
                      variant="outline"
                      className="w-full bg-earth3 text-earth hover:bg-earth3/20 border-earth3 transition-all duration-300"
                    >
                      <MessageCircleX className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-earth6 border-earth3">
                    <DialogHeader>
                      <DialogTitle className="text-earth">
                        Cancel Order
                      </DialogTitle>
                      <DialogDescription className="text-earth1">
                        Are you sure you want to cancel this order?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                      <DialogClose asChild>
                        <Button
                          onClick={handleModalClose}
                          variant="outline"
                          className="w-full bg-earth6 text-earth hover:bg-earth3/20 border-earth3"
                        >
                          No, keep it
                        </Button>
                      </DialogClose>
                      <Button
                        disabled={loading}
                        onClick={() => cancelPayments(item?.or_id)}
                        className="w-full bg-earth text-earth6 hover:bg-earth1"
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          "Yes, cancel"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={() =>
                    handlePayment(item?.or_id, item?.or_total_price)
                  }
                  className="w-full"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Payment
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  });
}

export default Pending;

Pending.propTypes = {
  orders: PropTypes.array,
};
