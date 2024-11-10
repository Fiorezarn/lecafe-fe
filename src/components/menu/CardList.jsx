import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import { CircleCheckBigIcon, CircleX, ShoppingCart } from "lucide-react";
import { Input } from "../ui/input";
import { cn, formatPrice } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { setPage } from "@/features/menu/menuSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

function CardList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menu, error, page, limit } = useSelector((state) => state.menu);
  const { cookie } = useSelector((state) => state.auth);
  const { message, errorCart } = useSelector((state) => state.cart);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { toast } = useToast();
  const [orderType, setOrderType] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch({ type: "auth/getCookie" });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: "menu/getAllMenu",
      payload: { page, limit, search, category },
    });
  }, [dispatch, page, limit, search, category]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

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

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const site = orderType === "Dine-in" ? tableNumber : address;

    if (!site) {
      toast({
        variant: "destructive",
        description: (
          <div className="flex items-center gap-2 font-bold">
            <CircleX className="text-white" />
            <p>Please provide a valid address or table number.</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
      return;
    }

    const menuJson = JSON.stringify(
      cart?.Menu?.map((item) => ({
        id: item.mn_id,
        name: item.mn_name,
        image: item.mn_image,
        price: item.mn_price,
        quantity: item.Cart?.cr_quantity,
      }))
    );

    dispatch({
      type: "order/createOrder",
      payload: {
        userId,
        typeOrder: orderType,
        site,
        totalPrice,
        menuJson,
      },
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "menu/getAllMenu",
      payload: { page, limit, search, category },
    });
  };

  useEffect(() => {
    if (error) {
      toast({
        description: (
          <div className="flex gap-2 font-bold">
            <CircleX className="text-red-600" />
            <p>{message}</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    }
  }, [error]);

  return (
    <div className="flex flex-col">
      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between mb-8">
        <form onSubmit={handleSearchSubmit}>
          <Input
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit(e);
              }
            }}
          />
        </form>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="coffee">Coffee</SelectItem>
              <SelectItem value="non-coffee">Non-Coffee</SelectItem>
              <SelectItem value="food">Food</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {menu?.data?.map((item) => (
          <Card
            key={item.mn_id}
            className="shadow-lg border border-gray-200 rounded-[20px] overflow-hidden bg-earth4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:rounded-[30px]"
          >
            <div
              className="cursor-pointer"
              onClick={() => {
                navigate(`/menu/${item.mn_id}`);
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-earth">Order Now</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Place Your Order</DialogTitle>
                    <DialogDescription>
                      Choose your order type and provide details. Click proceed
                      when you're ready.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-6">
                    <label className="block text-lg font-semibold mb-2">
                      Order Type
                    </label>
                    <Select onValueChange={(value) => setOrderType(value)}>
                      <SelectTrigger className="w-full text-black">
                        <SelectValue placeholder="Select Order Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Order Type</SelectLabel>
                          <SelectItem value="Dine-in">Dine In</SelectItem>
                          <SelectItem value="Delivery">Delivery</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {orderType === "Dine-in" && (
                    <div className="mt-4">
                      <label className="block text-lg font-semibold mb-2">
                        Table Number
                      </label>
                      <Select onValueChange={(value) => setTableNumber(value)}>
                        <SelectTrigger className="w-full mb-4 text-black">
                          <SelectValue placeholder="Select Table Number" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(10).keys()].map((num) => (
                            <SelectItem key={num + 1} value={String(num + 1)}>
                              {num + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {orderType === "Delivery" && (
                    <div className="mt-4">
                      <label className="block text-lg font-semibold mb-2">
                        Address
                      </label>
                      <Textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 rounded-lg bg-brown-700 text-black"
                        placeholder="Enter delivery address"
                      />
                    </div>
                  )}

                  <DialogFooter>
                    <Button
                      className="w-full mt-6 bg-earth text-white hover:bg-gray-800"
                      onClick={handleOrderSubmit}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Proceed to Checkout"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Pagination className="my-16 cursor-pointer">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            />
          </PaginationItem>
          {[...Array(menu?.totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                isActive={index + 1 === page}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(page + 1)}
              disabled={page === menu?.totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default CardList;
