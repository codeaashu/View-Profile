"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

export const MagicButton = ({ title, icon, position, otherClasses, href }) => {
  const router = useRouter();

  return (
    <Button
      className={`relative inline-flex h-12 w-full overflow-hidden rounded-lg p-[1px] focus:outline-none cursor-pointer ${otherClasses}`}
      onClick={() => {
        href && router.push(href);
      }}
      aria-label={title}
    >
      {/* border */}
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-background px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </Button>
  );
};
