import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDate, formatPrice } from "@/lib/utils";
import { CheckCircleIcon, WalletCards } from "lucide-react";
import NoData from "@/components/orderStatus/NoData";

function Ordered({ orders }) {
  const orderedOrders = orders?.filter(
    (order) =>
      order?.or_status_shipping === "delivered" &&
      order?.or_status_payment === "settlement"
  );

  if (!orderedOrders?.length)
    return (
      <NoData
        title={"No Ordered Orders"}
        paragraph={
          "You currently have no ordered orders. Check back here to track active orders."
        }
      />
    );

  return orderedOrders.map((item, index) => {
    const menus = JSON.parse(item.OrderDetail[0].od_mn_json);
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
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="w-full md:w-1/2 p-8">
                <ul className="overflow-y-auto max-h-[300px] space-y-4">
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
                        <h1 className="text-lg font-semibold text-gray-800">
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
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-end">
                <h1 className="text-2xl font-bold text-green-800">
                  Total Price: {formatPrice(item?.or_total_price)}
                </h1>
                <p className="text-xl flex text-gray-600">
                  <WalletCards />: {item?.payment_method}
                </p>
                <p className="text-xl text-gray-600">
                  {isNaN(Number(item?.or_site))
                    ? "Delivery: " + item?.or_site
                    : "Dine in Table: " + item?.or_site}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  });
}

export default Ordered;
