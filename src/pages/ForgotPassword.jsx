import heroImage from "../assets/images/hero.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ForgotPassword() {
  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const action = queryParams.get("token");

  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL_BE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const repeatpassword = e.target.repeatpassword.value;
    if (password !== repeatpassword) {
      toast.error("Password doesn't match");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/auth/forgot-password?token=${action}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ password }),
        }
      );
      const result = await response.json();
      setLoading(false);
      if (result.code !== 200) {
        toast.error(result.message);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex h-screen justify-between items-center">
      <img className="w-1/2 hidden lg:block h-full" src={heroImage} alt="" />
      <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center gap-6">
        <h1 className="text-3xl font-semibold text-earth">
          Forgot your password?
        </h1>
        <p className="text-earth2">
          Enter your new password. Your new password must be different from
          previous used password.
        </p>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Input
            id="password"
            className="w-full"
            type="password"
            placeholder="Password"
            required
          />
          <Input
            id="repeatpassword"
            className="w-full"
            type="password"
            placeholder="Repeat Password"
            required
          />
          <Button className="w-full bg-earth" type="submit">
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
