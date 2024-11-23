import { Button } from "@/components/ui/button";
import heroImage from "../assets/images/hero.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CircleCheckBigIcon, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
import ButtonGoogle from "@/components/auth/Google";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

function Register() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const fullname = e.target.fullname.value;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const phonenumber = phoneNumber;
    const password = e.target.password.value;

    dispatch({
      type: "auth/registerRequest",
      payload: { fullname, username, email, phonenumber, password },
    });
  };

  useEffect(() => {
    if (error) {
      const code = error?.code;
      if (code !== 201) {
        toast({
          variant: "destructive",
          description: (
            <div className="flex items-center gap-2 font-bold">
              <CircleX className="text-white" />
              <p>{error?.message}</p>
            </div>
          ),
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
        });
      }
    } else if (user?.code === 201) {
      toast({
        description: (
          <div className="flex gap-2 font-bold">
            <CircleCheckBigIcon className="text-green-600" />
            <p>We have sent you an email to verify your account.</p>
          </div>
        ),
        className: cn(
          "top-10 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    }
  }, [error, user]);

  return (
    <div className="flex h-screen justify-between items-center">
      <img className="w-1/2 hidden lg:block h-full" src={heroImage} alt="" />
      <div className="w-full lg:w-1/2 p-10 lg:p-20">
        <div className="text-center mb-6">
          <h1 className="text-lg md:text-4xl font-mono font-bold text-earth mb-2">
            Become a Part of Le Café
          </h1>
          <p className="text-sm md:text-lg font-sour text-earth2 italic">
            Create your account and start your journey with us.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            id="fullname"
            className="mt-2"
            type="fullname"
            placeholder="Full Name"
            required
          />
          <Input
            id="username"
            className="mt-2"
            type="username"
            placeholder="Username"
            required
          />
          <PhoneInput
            id="phonenumber"
            placeholder="Enter phone number"
            defaultCountry="ID"
            value={phoneNumber}
            onChange={setPhoneNumber}
            className="w-full p-2 mt-2 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-earth2"
            required
          />
          <Input
            id="email"
            className="mt-2"
            type="email"
            placeholder="Email Address"
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
          <div className="mt-4">
            <Button
              className="w-full font-sans font-bold text-lg bg-[#4B332B]"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </Button>
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
                Or
              </p>
            </div>
          </div>
        </form>
        <ButtonGoogle text="Register with google" />
        <div className="mt-4 font-semibold flex justify-between text-sm text-slate-500 text-center md:text-left">
          <a
            className="text-[#C0AF90] hover:underline hover:underline-offset-4"
            href="/login"
          >
            Already have an account?
          </a>
          <a className="text-slate-500 flex gap-2" href="/">
            Back
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
