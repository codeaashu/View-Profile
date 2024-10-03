"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import Link from "next/link";

export const columns = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          aria-label="sort usernames"
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase ml-4 truncate">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden sm:flex"
          aria-label="sort emails"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="hidden sm:block lowercase ml-4 truncate">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "profile",
    header: () => <div>User Profile</div>,
    cell: ({ row }) => {
      return (
        <Link href={`/users/${row.original.username}`} variant="outline">
          <Button variant="outline" aria-label="watch profile">
            Profile
            <ChevronRight />
          </Button>
        </Link>
      );
    },
  },
];
