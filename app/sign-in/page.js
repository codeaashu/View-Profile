import { auth } from "@/auth";
import GoogleSignIn from "@/components/auth/GoogleSignIn";
import { permanentRedirect } from "next/navigation";

export function generateMetadata({ params }) {
  return {
    title: `Sign In | Angstrom`,
    description: `Sign in to access your Angstrom account.`,
  };
}

export default async function page() {
  const session = await auth();
  if (session) permanentRedirect("/");
  return (
    <div className="flex justify-center items-center h-screen -m-10">
      <GoogleSignIn />
    </div>
  );
}
