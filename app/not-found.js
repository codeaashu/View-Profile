import { MagicButton } from "@/components/ui/MagicButton";
import { Send } from "lucide-react";

export function generateMetadata({ params }) {
  return {
    title: `Page Not Found | Angstrom`,
    description: `The page you're looking for does not exist. Please check the URL or return to the homepage.`,
  };
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen -m-10 p-10">
      <h1 className="text-5xl font-bold text-red-400">404</h1>
      <h2 className="text-3xl font-semibold mb-4 text-gray-100 text-center">
        Page Not Found
      </h2>

      <p className="text-lg text-center text-wrap-balance">
        The page you&apos;re looking for does not exist.
      </p>
      <p className="text-lg mb-4 text-center text-wrap-balance">
        Please check the URL or return to the homepage.
      </p>

      <MagicButton
        title="Return to Homepage"
        position="right"
        icon={<Send size={20} />}
        href={"/"}
        otherClasses="mx-10 max-w-56"
      />
    </div>
  );
}
