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
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheckBigIcon,
  CircleX,
  ShoppingCart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn, formatPrice } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { setPage } from "@/features/menu/menuSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import ButtonOrderNow from "@/components/menu/ButtonOrderNow";
import NoData from "../orderStatus/NoData";
import CardSkeleton from "./CardSkeleton";

function CardList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menu, error, page, limit, loading } = useSelector(
    (state) => state.menu
  );
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
        variant: "destructive",
        description: (
          <div className="flex items-center gap-2 font-bold">
            <CircleX className="text-white" />
            <p>{message || error}</p>
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
      <div>
        {loading ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
            {[...Array(8)].map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : null}
        {menu?.totalItems === 0 ? (
          <NoData
            className="text-center"
            title={"No data found"}
            paragraph={
              "Please check your internet connection or try again later."
            }
          />
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
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
                      className="w-full h-full rounded-md object-cover"
                      src={`${item.mn_image}`}
                      alt={item.mn_name}
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg font-mono font-semibold">
                      {item.mn_name}
                    </CardTitle>
                    <CardDescription className="font-sour text-gray-600">
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
                    <Button
                      className="bg-earth shadow-md shadow-gray-500 hover:bg-earth-dark hover:shadow-lg hover:shadow-gray-600 transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                      type="submit"
                    >
                      <ShoppingCart />
                    </Button>
                  </form>
                  <ButtonOrderNow idMenu={item?.mn_id} />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Pagination className="my-16 cursor-pointer">
        <PaginationContent>
          <PaginationItem
            className={page === 1 ? "cursor-not-allowed" : "cursor-pointer"}
          >
            <Button
              className="bg-transparent hover:bg-white"
              size="sm"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="text-black" />
            </Button>
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
          <PaginationItem
            className={
              page === menu?.totalPages
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }
          >
            <Button
              className="bg-transparent hover:bg-white"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === menu?.totalPages}
            >
              <ChevronRight className="text-black" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default CardList;
