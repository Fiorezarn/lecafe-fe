import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { fetchLoginGoogle } from "@/features/auth/authApi";
import firebaseConfig from "../../../firebaseconfig";

function ButtonGoogle({ text }) {
  const navigate = useNavigate();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const loginWithGoogle = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      await fetchLoginGoogle(idToken);
      navigate("/");
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };
  return (
    <Button variant="outline" className="w-full" onClick={loginWithGoogle}>
      {text}
      <FcGoogle />
    </Button>
  );
}

export default ButtonGoogle;
