import { signIn } from "@/auth";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";

export default function GoogleSignIn({ isFull }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button
        variant="outline"
        type="submit"
        className={isFull && "w-full"}
        aria-label="go to sign-in page"
      >
        Sign in with Google
        <FaGoogle className="ml-2 text-xl" />
      </Button>
    </form>
  );
}
