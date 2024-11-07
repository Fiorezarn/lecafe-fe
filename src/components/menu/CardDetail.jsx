import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import { useParams } from "react-router-dom";
function CardDetail() {
  const dispatch = useDispatch();
  const { menuById } = useSelector((state) => state.menu);
  const { cookie } = useSelector((state) => state.auth);
  const { message, errorCart, count } = useSelector((state) => state.cart);
  const { id } = useParams();

  useEffect(() => {
    document
      .getElementById("menu-detail")
      .scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    dispatch({ type: "menu/getMenuById", payload: id });
  }, [dispatch]);
  const handleSubmit = () => {
    const quantity = count;
    const userId = cookie?.us_id;

    dispatch({
      type: "cart/addCart",
      payload: { userId, id, quantity },
    });
  };

  const handleDecrement = () => {
    if (count >= 1) {
      dispatch({ type: "cart/decrement" });
    }
  };

  const handleIncrement = () => {
    dispatch({ type: "cart/increment" });
  };

  useEffect(() => {
    if (message) {
      if (errorCart) {
        toast.error(message);
        dispatch({ type: "cart/setMessage" });
      } else {
        toast.success(message);
        dispatch({ type: "cart/setMessage" });
      }
    }
  }, [message]);

  return (
    <div className="flex flex-col lg:flex-row rounded-xl">
      <img
        className="w-full lg:w-1/2 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none"
        src={`${menuById?.mn_image}`}
        alt={`${menuById?.mn_image}`}
      />

      <div className="w-full lg:w-1/2 rounded-b-xl lg:rounded-r-xl flex flex-col justify-between bg-earth4 p-4 md:p-6 lg:p-10">
        <div className="flex flex-col justify-between">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-10">
            {menuById?.mn_name}
          </h1>
          <div className="mb-4 lg:mb-10">
            <p className="text-gray-600 text-lg md:text-xl lg:text-2xl font-semibold">
              {menuById?.mn_desc}
            </p>
            <p className="text-gray-600">{menuById?.mn_category}</p>
          </div>
          <span className="text-lg md:text-2xl font-bold">
            {formatPrice(menuById?.mn_price)}
          </span>

          <div className="flex space-x-2 md:space-x-4 mt-4">
            <div className="bg-white flex justify-between items-center border border-black rounded-md p-1">
              <Button
                variant="transparant"
                size="xs"
                className="flex items-center justify-center h-full text-black"
                onClick={handleDecrement}
              >
                <Minus className="h-[80%] w-[80%]" />
              </Button>
              <input
                id="quantity"
                type="number"
                className="placeholder:leading-loose text-black w-[30%] h-full font-mono mx-2 placeholder:text-center focus:outline-none focus:border-none focus:ring-0 text-center [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0"
                value={count}
                readOnly
              />
              <Button
                variant="transparant"
                size="xs"
                className="flex items-center justify-center h-full text-black"
                onClick={handleIncrement}
              >
                <Plus className="h-[80%] w-[80%]" />
              </Button>
            </div>
            <Button className="bg-earth" onClick={handleSubmit}>
              <ShoppingCart />
            </Button>
            <Button>Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
