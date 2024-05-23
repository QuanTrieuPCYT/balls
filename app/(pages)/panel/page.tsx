"use client";

import PanelBreadcrumb from "@/app/components/PanelBreadcrumb";
import PanelCreateLinkBox from "@/app/components/PanelCreateLinkBox";
import PanelOverralStatistics from "@/app/components/PanelOverallStatistics";
import PanelURLList from "@/app/components/PanelURLList/PanelURLList";
import { IPanelBreadcrumb } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const bc: IPanelBreadcrumb[] = [
  {
    name: "/",
    path: null,
  },
  {
    name: "Dashboard",
    path: null
  }
]

export default function Page() {
  const session = useSession();
  if (session.status == "loading") return "";
  if (session.status == "unauthenticated") redirect('/auth');
  console.log(session.data);
  return (
    <div className="container max-w-screen-lg w-full py-4">
      <PanelBreadcrumb breadcrumb={bc}/>
      <PanelCreateLinkBox />
      <PanelURLList />
      <PanelOverralStatistics />
    </div>
  )
}
