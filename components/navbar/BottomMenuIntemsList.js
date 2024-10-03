"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { default_user_pic, menuItems } from "@/constants.js";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useStore from "@/stores/useStore";
import { toast } from "sonner";
import { extractFirstLetters, resolveUrl } from "@/utils";
import { SheetClose } from "../ui/sheet";
import { LogOut } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

export default function BottomMenuItemsList({ session }) {
  const pathname = usePathname();
  const { user, setUser } = useStore();
  useEffect(() => {
    const getUser = async (email) => {
      try {
        const response = await fetch(`/api/user?email=${email}`);
        const data = await response.json();
        if (data.user) setUser(data.user);
        else if (data.error) throw new Error(data.error);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    };
    if (session?.user?.email && !user) getUser(session.user.email);
    else if (!session) setUser(null);
  }, [session, user, setUser]);
  return (
    <div className="absolute bottom-0 w-full">
      {session?.user?.email ? (
        <>
          {user?.username ? (
            menuItems.bottom.map((item) => (
              <SheetClose asChild key={item.path}>
                <Link
                  href={
                    item.name === "My Details"
                      ? `${item.path}/${user.username}`
                      : item.path
                  }
                  className="w-full"
                >
                  <Button
                    className={`w-full mb-1.5 ${
                      item.name === "My Details"
                        ? pathname === `${item.path}/${user.username}` &&
                          "bg-slate-300 hover:bg-slate-300"
                        : pathname === item.path &&
                          "bg-slate-300 hover:bg-slate-300"
                    }`}
                    aria-label={item.name}
                  >
                    {item.name}
                    {item.name === "My Details" && (
                      <Avatar className="ml-3 size-7 text-foreground">
                        <AvatarImage
                          src={resolveUrl(user.pic, default_user_pic)}
                        />
                        <AvatarFallback>
                          {extractFirstLetters(user)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </Button>
                </Link>
              </SheetClose>
            ))
          ) : (
            <></>
          )}
          <SheetClose asChild>
            <Link href="/sign-out" className="w-full">
              <Button
                variant="ghost"
                className="w-full"
                aria-label="go to sign-out page"
              >
                Sign Out <LogOut className="ml-2 text-xl" />
              </Button>
            </Link>
          </SheetClose>
        </>
      ) : (
        <SheetClose asChild>
          <Link href="/sign-in" className="w-full">
            <Button
              variant="ghost"
              className="w-full"
              aria-label="go to sign-in page"
            >
              Sign in with Google
              <FaGoogle className="ml-2 text-xl" />
            </Button>
          </Link>
        </SheetClose>
      )}
    </div>
  );
}
