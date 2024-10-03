import { LogOut } from "lucide-react";
import { signOut } from "../../auth.js";
import { Button } from "../ui/button.jsx";

export default function SignOut({ isFull }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button
        variant="outline"
        type="submit"
        className={isFull && "w-full"}
        aria-label="go to sign-out page"
      >
        Sign Out <LogOut className="ml-2 text-xl" />
      </Button>
    </form>
  );
}
