import { Separator } from "@/components/ui/separator";
import { Contact, MapPin, Notebook, Phone, WalletCards } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatPrice } from "@/lib/utils";
import PropTypes from "prop-types";

function PaymentInfo({ item, shipping, isPaymentMethod }) {
  return (
    <div className="mt-6 space-y-6 bg-earth6 rounded-lg p-6 shadow-inner">
      <div className="flex justify-between items-center">
        <span className="text-earth1 text-base md:text-lg">Sub total</span>
        <span className="text-earth text-base md:text-lg font-bold">
          {formatPrice(item?.or_total_price - shipping[0].price)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-earth1 text-base md:text-lg">Fee Shipping</span>
        <span className="text-earth text-base md:text-lg font-bold">
          {formatPrice(shipping[0].price)}
        </span>
      </div>
      <Separator className="bg-earth3/50" />
      <div className="flex justify-between items-center">
        <span className="text-earth1 text-base md:text-lg">Total Price</span>
        <span className="text-earth text-base md:text-lg font-bold">
          {formatPrice(item?.or_total_price)}
        </span>
      </div>
      <Separator className="bg-earth3/50" />
      <div className="grid gap-y-4">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4">
          <Contact className="w-5 h-5" />
          <span className="text-earth1 text-sm md:text-base">
            Name Recipient :
          </span>
          <span className="text-earth text-sm md:text-base">
            {item?.or_name_recipient}
          </span>
        </div>
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4">
          <Phone className="w-5 h-5" />
          <span className="text-earth1 text-sm md:text-base">
            Phone Number :
          </span>
          <span className="text-earth text-sm md:text-base">
            {item?.or_phonenumber}
          </span>
        </div>
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4">
          <WalletCards className="w-5 h-5" />
          <span className="text-earth1 text-sm md:text-base">
            {isNaN(Number(item?.or_site))
              ? "Delivery Address:"
              : "Table Number:"}
          </span>
          {isNaN(Number(item?.or_site)) ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-right text-earth text-sm md:text-base truncate max-w-[200px]">
                  {item?.or_site.length > 25
                    ? `${item?.or_site.substring(0, 25)}...`
                    : item?.or_site}
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <span className="text-earth text-sm md:text-base">
                    {item?.or_site}
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <span className="text-earth text-sm md:text-base text-right">
              Table {item?.or_site}
            </span>
          )}
        </div>
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4">
          <Notebook className="w-5 h-5" />
          <span className="text-earth1 text-sm md:text-base">Note :</span>
          <span className="text-earth text-sm md:text-base">
            {item?.or_note}
          </span>
        </div>
        <div
          className={`grid grid-cols-[auto_1fr_auto] items-center gap-x-4 ${
            isPaymentMethod ? "block" : "hidden"
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-earth1 text-sm md:text-base">
            Payment Method :
          </span>
          <span className="text-earth text-sm md:text-base">
            {item?.payment_method}
          </span>
        </div>
      </div>
    </div>
  );
}

PaymentInfo.propTypes = {
  item: PropTypes.object,
  shipping: PropTypes.array,
  isPaymentMethod: PropTypes.bool,
};

export default PaymentInfo;
