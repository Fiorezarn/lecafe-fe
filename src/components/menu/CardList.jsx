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
import { CircleCheckBigIcon, ShoppingCart } from "lucide-react";
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

function CardList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menu, error, page, limit } = useSelector((state) => state.menu);
  const { cookie } = useSelector((state) => state.auth);
  const { message, errorCart } = useSelector((state) => state.cart);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { toast } = useToast();

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
            className="shadow-md border border-gray-200 rounded-lg overflow-hidden bg-earth4"
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
              <Button className="bg-earth">Order Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Pagination className="my-16">
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
