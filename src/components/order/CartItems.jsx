import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import NoData from "./NoData";

export function CartItems() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { cookie } = useSelector((state) => state.auth);
  const userId = cookie?.us_id;

  const handleDecrement = (itemId, count) => {
    const id = itemId;
    const quantity = count > 1 ? count - 1 : 1;
    dispatch({
      type: "cart/updateQuantity",
      payload: { id, quantity, userId },
    });
  };

  const handleIncrement = (itemId, count) => {
    const id = itemId;
    const quantity = count + 1;
    dispatch({
      type: "cart/updateQuantity",
      payload: { id, quantity, userId },
    });
  };

  return (
    <section className="flex-1 h-full overflow-auto">
      <h2 className="text-2xl font-bold mb-4 text-earth font-mono">
        Your Cart
      </h2>
      <div className="space-y-4">
        {cart?.Menu?.length === 0 ? (
          <NoData
            className="text-center"
            title="Your cart is empty"
            paragraph="Looks like you haven't added anything to your cart yet. Start shopping!"
          />
        ) : (
          cart?.Menu?.map((item) => (
            <div
              key={item.mn_id}
              className="flex flex-col lg:flex-row items-center bg-earth2 justify-between p-4 bg-brown-800 text-white rounded-lg shadow-md"
            >
              <img
                src={item.mn_image}
                alt={item.mn_name}
                className="w-16 h-16 rounded-md object-cover mb-4 lg:mb-0 lg:mr-4"
              />
              <div className="flex-1">
                <h3 className="lg:text-xl font-mono font-semibold">
                  {item.mn_name}
                </h3>
                <p className="text-xs lg:text-sm text-gray-300">
                  {formatPrice(item.mn_price)}
                </p>
              </div>
              <div className="flex items-center w-full lg:w-auto mt-4 lg:mt-0 justify-between gap-2">
                <div className="bg-white flex items-center justify-between border border-black rounded-md p-1 w-full max-w-xs">
                  <Button
                    variant="transparent"
                    size="xs"
                    className="flex items-center justify-center h-full text-black"
                    onClick={() =>
                      handleDecrement(
                        item?.Cart?.cr_id,
                        item?.Cart?.cr_quantity
                      )
                    }
                  >
                    <Minus />
                  </Button>
                  <input
                    id="quantity"
                    type="number"
                    className="placeholder:leading-loose text-black h-full font-mono mx-2 placeholder:text-center focus:outline-none focus:border-none focus:ring-0 text-center [&::-webkit-inner-spin-button]:appearance-none w-16"
                    placeholder="0"
                    value={item.Cart?.cr_quantity}
                    readOnly
                  />
                  <Button
                    variant="transparent"
                    size="xs"
                    className="flex items-center justify-center h-full text-black"
                    onClick={() =>
                      handleIncrement(
                        item?.Cart?.cr_id,
                        item?.Cart?.cr_quantity
                      )
                    }
                  >
                    <Plus />
                  </Button>
                </div>
                <Button
                  variant="destructive"
                  className="flex items-center justify-center h-full lg:w-auto w-full ml-4"
                  onClick={() =>
                    dispatch({
                      type: "cart/deleteCart",
                      payload: { userId, menuId: item.mn_id },
                    })
                  }
                >
                  <Trash className="h-[80%] w-[80%]" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
