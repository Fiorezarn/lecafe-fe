import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from "../../../firebaseconfig";
import { useDispatch } from "react-redux";

function ButtonGoogle({ text }) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();

  const loginWithGoogle = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      dispatch({ type: "auth/loginWithGoogle", payload: idToken });
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
