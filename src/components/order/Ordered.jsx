import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDate, formatPrice } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircleIcon } from "lucide-react";
import NoData from "@/components/order/NoData";
import { useSelector } from "react-redux";
import AccordionSkeleton from "./AccordionSkeleton";
import { DownloadInvoice } from "./Invoice";
import PaymentInfo from "./PaymentInfo";
import PropTypes from "prop-types";

function Ordered({ orders }) {
  const { loading } = useSelector((state) => state.order);

  if (loading) {
    return (
      <div className="space-y-4 h-[80vh]">
        {[...Array(3)].map((_, index) => (
          <AccordionSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="h-[80vh] items-center flex justify-center">
      <NoData
        title={"No Ordered Orders"}
        paragraph={
          "You currently have no ordered orders. Check back here to track active orders."
        }
      />
      </div>
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
            <div className="flex justify-between items-center w-full p-4 bg-green-100 rounded-lg shadow-sm">
              <h1 className="text-sm lg:text-2xl font-semibold text-green-800 flex items-center gap-2">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
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
                <h3 className="text-earth text-xl font-semibold mb-4">
                  Order Items
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
                  <h3 className="text-earth text-xl font-semibold mb-4">
                    Order Summary
                  </h3>
                  <PaymentInfo
                    item={item}
                    shipping={shipping}
                    isPaymentMethod={true}
                  />
                </div>
                <div className="mt-6 bg-earth2/20 rounded-lg p-4">
                  <p className="text-earth text-center font-medium">
                    Thank you for your order!
                  </p>
                  <DownloadInvoice orderData={item} />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  });
}

export default Ordered;

Ordered.propTypes = {
  orders: PropTypes.array,
};
