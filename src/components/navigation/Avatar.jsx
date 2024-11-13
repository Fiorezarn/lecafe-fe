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
import { fetchLogout } from "@/features/auth/authApi";

function AvatarNav() {
  const { cookie } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "auth/getCookie" });
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const response = await fetchLogout();
      if (response.code === 200) {
        navigate(0);
        console.log(response);
      } else {
        console.error(response.message);
      }
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
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center justify-center w-10 h-10 rounded-full bg-teal-600 text-white text-lg font-bold">
              {generateAvatar(cookie?.us_username)}
            </div>
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
        <a className="text-white font-mono" href="/login">
          Login
        </a>
      )}
    </>
  );
}

export default AvatarNav;
