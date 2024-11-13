import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function AvatarNav() {
  const BASE_URL = import.meta.env.VITE_BASE_URL_BE;
  const { cookie } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "auth/getCookie" });
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      navigate(0);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const generateAvatar = (username) => {
    return username ? username.slice(0, 2).toUpperCase() : "US";
  };

  return (
    <>
      {cookie ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-600 text-white text-lg font-bold">
              {generateAvatar(cookie?.us_username)}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{cookie?.us_username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <a className="text-white" href="/login">
          Login
        </a>
      )}
    </>
  );
}

export default AvatarNav;
