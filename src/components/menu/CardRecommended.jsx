import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { fetchMenuRecommended } from "@/features/menu/menuApi";
import { cn, formatPrice } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";
import { CircleCheckBigIcon, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

function CardRecommended() {
  const { toast } = useToast();
  const [menu, setMenu] = useState([]);
  const { cookie } = useSelector((state) => state.auth);
  const { message, errorCart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getRecommendedMenus = async () => {
    try {
      const response = await fetchMenuRecommended();
      if (response) {
        setMenu(response?.data);
      }
    } catch (error) {
      console.error("Error fetching recommended menus:", error);
    }
  };

  useEffect(() => {
    getRecommendedMenus();
  }, []);

  useEffect(() => {
    if (message) {
      toast({
        description: (
          <div className="flex gap-2 font-bold">
            <CircleCheckBigIcon className="text-green-600" />
            <p>{message}</p>
          </div>
        ),
        className: cn(
          "top-10 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
      dispatch({ type: "cart/setMessage" });
    }
  }, [message, errorCart, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const quantity = 1;
    const menuId = e.target.menuId.value;
    const userId = cookie?.us_id;

    if (!cookie) {
      navigate("/login");
    } else {
      dispatch({
        type: "cart/addCart",
        payload: { userId, menuId, quantity },
      });
    }
  };

  return (
    <>
      {menu?.map((item) => (
        <Card
          key={item.mn_id}
          className="shadow-md border border-gray-200 rounded-lg overflow-hidden bg-earth4"
        >
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate(`/menu/${item.mn_id}`);
              dispatch({ type: "menu/getMenuById", payload: item.mn_id });
            }}
          >
            <CardHeader className="h-48 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={`${item.mn_image}`}
                alt={item.mn_name}
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg font-semibold">
                {item.mn_name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {item.mn_category}
              </CardDescription>
              <p className="font-semibold text-primary mt-2">
                {formatPrice(item.mn_price)}
              </p>
            </CardContent>
          </div>
          <CardFooter className="flex justify-between items-center">
            <form
              className="flex w-[50%] space-x-2 mr-6"
              onSubmit={handleSubmit}
            >
              <Input
                className="hidden"
                value={item.mn_id}
                id="menuId"
                type="hidden"
                required
              />
              <Button className="bg-earth" type="submit">
                <ShoppingCart />
              </Button>
            </form>
            <Button className="bg-earth">Order Now</Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}

export default CardRecommended;
