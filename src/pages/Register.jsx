import { Button } from "@/components/ui/button";
import heroImage from "../assets/images/hero.jpg";
import { FcGoogle } from "react-icons/fc";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from "../../firebaseconfig.json";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

function Register() {
  const navigate = useNavigate();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    const fullname = e.target.fullname.value;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const phonenumber = e.target.phonenumber.value;
    const password = e.target.password.value;

    dispatch({
      type: "auth/registerRequest",
      payload: { fullname, username, email, phonenumber, password },
    });
    e.target.reset();
  };

  useEffect(() => {
    if (user) {
      const code = user?.code;
      if (code !== 201) {
        toast.error(user?.message);
      } else {
        toast.success(user?.message, {
          duration: Infinity,
          description: "We have sent you an email to verify your account.",
        });
      }
    }
  }, [user]);

  const loginWithGoogle = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken,
        }),
        credentials: "include",
      });
      navigate("/");
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };
  return (
    <div className="flex h-screen justify-between items-center">
      <img className="w-1/2 hidden lg:block h-full" src={heroImage} alt="" />
      <div className="w-full lg:w-1/2 p-10 lg:p-20">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-earth mb-2">
            Become a Part of Le Café
          </h1>
          <p className="text-lg text-earth2 italic">
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
          <Input
            id="phonenumber"
            className="mt-2"
            type="text"
            placeholder="Phone Number"
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
              className="w-full bg-[#4B332B]"
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
            <Button
              variant="outline"
              className="w-full"
              onClick={loginWithGoogle}
            >
              Register with google <FcGoogle />
            </Button>
          </div>
        </form>
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
