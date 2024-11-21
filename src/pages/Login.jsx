import { Button } from "@/components/ui/button";
import heroImage from "../assets/images/hero.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { CircleCheckBigIcon, CircleX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ToastAction } from "@/components/ui/toast";
import ButtonGoogle from "@/components/auth/Google";

function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const handlelogin = async (e) => {
    e.preventDefault();
    const input = e.target.email.value;
    const password = e.target.password.value;

    dispatch({
      type: "auth/loginRequest",
      payload: { input, password },
    });
  };

  useEffect(() => {
    if (error) {
      if (error.type === "notverify") {
        toast({
          variant: "destructive",
          description: (
            <div className="flex items-center gap-2 font-bold">
              <CircleX className="text-white" />
              <p className="text-white">{error?.message}</p>
            </div>
          ),
          action: (
            <ToastAction
              onClick={() => navigate("/send-email?action=verify-email")}
              className="bg-red-800"
              altText="Goto verify email"
            >
              Click Here
            </ToastAction>
          ),
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
        });
        return;
      } else if (error.type === "invalidpassword" || error?.code !== 200) {
        toast({
          variant: "destructive",
          description: (
            <div className="flex items-center gap-2 font-bold">
              <CircleX className="text-white" />
              <p className="text-white">{error?.message}</p>
            </div>
          ),
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
        });
        return;
      }
    }
  }, [error]);

  return (
    <div className="flex h-screen justify-between items-center">
      <img
        className="w-1/2 h-full hidden lg:block"
        src={heroImage}
        alt="hero"
      />
      <div className="w-full lg:w-1/2 p-6 md:p-24 lg:p-20">
        <div className="text-center mb-6">
          <h1 className="text-lg md:text-4xl font-mono font-bold text-earth mb-2">
            Welcome Back to Le Café
          </h1>
          <p className="md:text-lg font-sour text-earth2 italic">
            "Discover a world of flavors with just a click. Your next favorite
            coffee awaits!"
          </p>
        </div>
        <form onSubmit={handlelogin}>
          <Input
            id="email"
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Email or Username"
            required
          />
          <Input
            id="password"
            className="mt-2"
            isPassword
            type="password"
            placeholder="Password"
            required
          />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>
            <a
              className="text-[#C0AF90] hover:underline hover:underline-offset-4"
              href="/send-email?action=forgot-password"
            >
              Forgot Password?
            </a>
          </div>
          <div className="mt-4">
            <Button
              type="submit"
              className="w-full font-sans font-bold text-lg bg-earth"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
                Or
              </p>
            </div>
          </div>
        </form>
        <ButtonGoogle text=" Login with google" />
        <div className="mt-4 font-semibold flex justify-between text-sm text-slate-500 text-center md:text-left">
          <a
            className="text-[#C0AF90] hover:underline hover:underline-offset-4"
            href="/register"
          >
            Don&apos;t have an account?
          </a>
          <a className="text-slate-500 flex gap-2" href="/">
            Back
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
