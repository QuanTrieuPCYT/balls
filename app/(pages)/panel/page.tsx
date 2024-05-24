"use client";

import PanelBreadcrumb from "@/app/components/PanelBreadcrumb";
import PanelCreateLinkBox from "@/app/components/PanelCreateLinkBox";
import PanelOverralStatistics from "@/app/components/PanelOverallStatistics";
import PanelURLList from "@/app/components/PanelURLList/PanelURLList";
import { IPanelBreadcrumb } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { useTheme } from "next-themes";
import { global_config } from "@/lib/global";

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
  const { theme } = useTheme();

  if (session.status == "loading") return "";
  if (session.status == "unauthenticated")  redirect(`${global_config.proxied_path}/auth`);

  return (
    <div className="container max-w-screen-lg w-full py-4">
      <PanelBreadcrumb breadcrumb={bc}/>
      <PanelCreateLinkBox />
      <PanelURLList />
      <PanelOverralStatistics />
      <ToastContainer theme={theme} />
    </div>
  )
}
