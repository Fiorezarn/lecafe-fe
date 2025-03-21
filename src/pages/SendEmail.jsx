import { Input } from "@/components/ui/input";
import heroImage from "../assets/images/hero.jpg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CircleCheckBigIcon, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
function SendEmail() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const action = queryParams.get("action");
  const email = queryParams.get("email");

  const BASE_URL = import.meta.env.VITE_BASE_URL_BE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    try {
      const response = await fetch(
        `${BASE_URL}/auth/${
          action === "verify-email" ? "send-email" : "send-forgot-password"
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();
      setLoading(false);
      if (result.code !== 200) {
        toast({
          variant: "destructive",
          description: (
            <div className="flex items-center gap-2 font-bold">
              <CircleX className="text-white" />
              <p>{result.message}</p>
            </div>
          ),
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
        });
      } else {
        toast({
          description: (
            <div className="flex gap-2 font-bold">
              <CircleCheckBigIcon className="text-green-600" />
              <p>{result.message}</p>
            </div>
          ),
          className: cn(
            "top-10 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
        });
      }
    } catch (error) {
      console.error("Error during send email:", error);
    }
  };

  return (
    <div className="flex h-screen justify-between items-center">
      <img className="w-1/2 hidden lg:block h-full" src={heroImage} alt="" />
      <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center gap-6">
        <h1 className="text-lg md:text-3xl text-earth font-semibold">
          {action === "verify-email" ? "Verify Email" : "Forgot your password?"}
        </h1>
        <p className="text-sm mdtext-lg text-earth2">
          {action === "verify-email"
            ? "Enter the email address associated with your account, and we'll send you a link to verify your email"
            : "Enter the email address associated with your account, and we'll send you a link to reset your password"}
        </p>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Input
            id="email"
            className="w-full mt-4"
            type="email"
            defaultValue={email}
            placeholder="Email"
          />
          <Button className="w-full bg-earth" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Send Email"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SendEmail;
