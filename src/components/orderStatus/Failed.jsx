import { formatDate, formatPrice } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleAlert } from "lucide-react";

function Failed({ orders }) {
  const failedOrders = orders?.filter(
    (order) =>
      order?.or_status_payment === "expired" ||
      (order?.or_status_payment === "cancelled" &&
        order?.or_status_shipping === "cancelled")
  );

  if (!failedOrders?.length)
    return (
      <NoData
        title={"No Failed Orders"}
        paragraph={
          "There are no failed orders at the moment. All orders have been successfully processed."
        }
      />
    );

  return failedOrders.map((item, index) => {
    const menus = JSON.parse(item.OrderDetail[0].od_mn_json);
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
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                <h1 className="text-2xl font-bold text-red-800">
                  Total Price: {formatPrice(item?.or_total_price)}
                </h1>
                <p className="text-xl text-gray-600">
                  {isNaN(Number(item?.or_site))
                    ? "Delivery: " + item?.or_site
                    : "Dine In: " + item?.or_site}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  });
}

export default Failed;
