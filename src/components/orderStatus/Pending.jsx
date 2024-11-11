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

function Pending({ orders }) {
  const dispatch = useDispatch();
  const { cookie } = useSelector((state) => state.auth);
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

  const pendingOrders = orders?.filter(
    (order) => order?.or_status_payment === "pending"
  );
  if (!pendingOrders?.length) return <div>Data Kosong</div>;

  return pendingOrders.map((item, index) => {
    const menus = JSON.parse(item.OrderDetail[0].od_mn_json);
    return (
      <Accordion key={index} type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex justify-between items-center w-full p-4 bg-yellow-100 rounded-lg shadow-sm">
              <h1 className="text-sm lg:text-2xl font-semibold text-yellow-800 flex items-center gap-2">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
                ORDER-{item.or_id}
              </h1>
              <p className="text-gray-700 text-sm lg:text-xl">
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
                          className="w-20 h-20 rounded-lg object-cover"
                          src={`${menu?.image}`}
                          alt="Menu item"
                        />
                        <h1 className="text-xl font-semibold text-gray-800">
                          {menu?.name}
                        </h1>
                      </div>
                      <p className="text-lg text-gray-700">
                        {menu?.price} x {menu?.quantity}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold text-gray-800">
                    Total Price: {formatPrice(item?.or_total_price)}
                  </h1>
                  <h1 className="text-xl text-gray-600">
                    {isNaN(Number(item?.or_site))
                      ? "Delivery: " + item?.or_site
                      : "Dine In: " + item?.or_site}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-red-600 text-white text-xl font-bold">
                        <MessageCircleX /> Cancel
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Cancel Order</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to cancel this order?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="justify-end">
                        <DialogClose asChild>
                          <Button>No</Button>
                        </DialogClose>
                        <Button
                          onClick={() => cancelPayments(item?.or_id)}
                          className="bg-red-600 text-white font-bold"
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
                    size="lg"
                    className="bg-yellow-600 text-white text-xl font-bold"
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
