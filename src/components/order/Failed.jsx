import { formatDate, formatPrice } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NoData from "@/components/order/NoData";
import { useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, CircleAlert } from "lucide-react";
import AccordionSkeleton from "./AccordionSkeleton";
import PaymentInfo from "./PaymentInfo";

function Failed({ orders }) {
  const { loading } = useSelector((state) => state.order);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <AccordionSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <NoData
        title={"No Failed Orders"}
        paragraph={
          "There are no failed orders at the moment. All orders have been successfully processed."
        }
      />
    );
  }

  return orders.map((item, index) => {
    const detailMenu = JSON.parse(item.OrderDetail[0].od_mn_json);
    const menus = detailMenu.filter((menu) => menu.id !== "SHIPPING");
    const shipping = detailMenu.filter((menu) => menu.id === "SHIPPING");
    return (
      <Accordion key={index} type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex justify-between items-center w-full p-4 bg-red-100 rounded-lg shadow-sm">
              <h1 className="text-sm lg:text-2xl font-semibold text-red-800 flex items-center gap-2">
                <CircleAlert className="w-6 h-6 text-red-600" />
                ORDER-{item.or_id}
              </h1>
              <p className="text-gray-700 text-sm lg:text-xl">
                {formatDate(item.createdAt)}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col md:flex-row bg-earth6 shadow-lg rounded-lg overflow-hidden border-2 border-earth1">
              <div className="w-full md:w-3/5 p-6">
                <h3 className="text-earth text-xl font-semibold mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 text-earth1 mr-2" />
                  Failed Order
                </h3>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {menus.map((menu, index) => (
                      <div key={index} className="group">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-earth4/30 transition-all duration-300 hover:bg-earth4/50">
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
                          <p className="text-earth2 text-base md:text-lg font-medium">
                            {formatPrice(menu?.price * menu?.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <div className="w-full md:w-2/5 bg-earth4/20 p-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <h3 className="text-earth text-xl font-semibold">
                    Order Summary
                  </h3>
                  <PaymentInfo
                    item={item}
                    shipping={shipping}
                    isPaymentMethod={false}
                  />
                </div>
                <div className="mt-6 bg-earth1/20 rounded-lg p-4">
                  <p className="text-earth1 text-center font-medium flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    This order has failed. Please contact support for
                    assistance.
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  });
}

export default Failed;
