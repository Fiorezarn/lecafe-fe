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
import { ClockIcon, MessageCircleX, Wallet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import NoData from "@/components/orderStatus/NoData";

function Pending({ orders }) {
  const dispatch = useDispatch();
  const { cookie } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.order);
  const cancelPayments = (id) => {
    dispatch({ type: "payments/cancelPayments", payload: id });
    location.reload();
  };

  const handlePayment = (id, amount) => {
    const email = cookie?.us_email;
    dispatch({
      type: "payments/createPayments",
      payload: { email, amount, id },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="flex gap-2">
          <div className="w-6 h-6 bg-red-600 rounded-full animate-bounce"></div>
          <div className="w-6 h-6 bg-red-600 rounded-full animate-bounce"></div>
          <div className="w-6 h-6 bg-red-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0)
    return (
      <NoData
        title={"No Pending Orders"}
        paragraph={
          "You currently have no orders in a pending status. All orders have been processed."
        }
      />
    );

  return orders.map((item, index) => {
    const menus = JSON.parse(item.OrderDetail[0].od_mn_json);
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
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="w-full md:w-1/2 p-8">
                <ul className="overflow-y-auto max-h-[300px] space-y-6">
                  {menus.map((menu, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
                          src={`${menu?.image}`}
                          alt="Menu item"
                        />
                        <h1 className="text-xs md:text-sm lg:text-xl font-semibold text-gray-800">
                          {menu?.name}
                        </h1>
                      </div>
                      <p className="text-xs md:text-sm lg:text-xl text-gray-700">
                        {menu?.price} x {menu?.quantity}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-end">
                <div className="mb-4">
                  <h1 className="text-sm md:text-sm lg:text-xl font-bold text-gray-800">
                    Total Price: {formatPrice(item?.or_total_price)}
                  </h1>
                  <h1 className="text-sm md:text-sm lg:text-xl text-gray-600">
                    {isNaN(Number(item?.or_site))
                      ? "Delivery: " + item?.or_site
                      : "Dine In: " + item?.or_site}
                  </h1>
                </div>
                <div className="flex flex-col lg:flex-row gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="text-xl w-full font-bold"
                      >
                        <MessageCircleX /> Cancel
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="">
                      <DialogHeader>
                        <DialogTitle>Cancel Order</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to cancel this order?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="">
                        <DialogClose asChild>
                          <Button className="w-full">No</Button>
                        </DialogClose>
                        <Button
                          onClick={() => cancelPayments(item?.or_id)}
                          className="bg-red-600 w-full text-white font-bold"
                        >
                          Yes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <div />
                  <Button
                    onClick={() =>
                      handlePayment(item?.or_id, item?.or_total_price)
                    }
                    className="bg-yellow-600 w-full text-white text-xl font-bold"
                  >
                    <Wallet /> Payment
                  </Button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  });
}

export default Pending;
