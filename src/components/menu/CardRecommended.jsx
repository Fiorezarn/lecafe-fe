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
import { formatPrice } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CardRecommended() {
  const [menu, setMenu] = useState([]);
  const { cookie } = useSelector((state) => state.auth);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">
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
      </div>
    </>
  );
}

export default CardRecommended;
