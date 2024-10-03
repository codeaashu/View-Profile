// import DataTable from "./data-table";
// import { getAllUsers } from "@/action/user";
import { permanentRedirect } from "next/navigation";

export default async function UsersPage() {
  // const data = await getAllUsers();
  // return <DataTable data={data} />;

  return permanentRedirect("/not-found");
}
