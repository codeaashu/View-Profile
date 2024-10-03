"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { menuItems } from "@/constants.js";
import { usePathname } from "next/navigation";
import { SheetClose } from "../ui/sheet";

export default function TopMenuItemsList() {
  const pathname = usePathname();

  return (
    <>
      {menuItems.top.map((item) => (
        <SheetClose asChild key={item.path}>
          <Link href={item.path} className="w-full">
            <Button
              className={`w-full mb-1.5 ${
                pathname == item.path && "bg-slate-300 hover:bg-slate-300"
              }`}
              aria-label={item.name}
            >
              {item.name}
            </Button>
          </Link>
        </SheetClose>
      ))}
    </>
  );
}
