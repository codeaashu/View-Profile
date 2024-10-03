import { auth } from "@/auth";
import SignOut from "@/components/auth/SignOut";
import { permanentRedirect } from "next/navigation";

export function generateMetadata({ params }) {
  return {
    title: `Sign Out | Angstrom`,
    description: `Sign out from your Angstrom account. We hope to see you again soon.`,
  };
}

export default async function page() {
  const session = await auth();
  if (!session) permanentRedirect("/sign-in");
  return (
    <div className="flex justify-center items-center h-screen -m-10">
      <SignOut />
    </div>
  );
}
