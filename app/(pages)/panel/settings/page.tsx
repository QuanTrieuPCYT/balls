"use client";

import PanelBreadcrumb from "@/app/components/PanelBreadcrumb"
import { global_config } from "@/lib/global";
import { IPanelBreadcrumb } from "@/lib/utils"
import { Lock, Pencil } from "lucide-react"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const bc: IPanelBreadcrumb[] = [
    {
        name: "/",
        path: null,
    },
    {
        name: "Dashboard",
        path: "/panel"
    },
    {
        name: "User Settings",
        path: null
    }
  ]

export default function Page() {
    const session = useSession();
    if (session.status == "loading") return "";
    if (session.status == "unauthenticated") redirect(`${global_config.proxied_path}/panel`)
    return (
        <div className="container max-w-screen-lg w-full py-4">
            <PanelBreadcrumb breadcrumb={bc}/>
            <div className="container p-4 mt-4 bg-slate-100 dark:bg-slate-900 rounded-xl">
                <p className="flex gap-2 text-lg font-bold mb-2 text-blue-700 dark:text-blue-500">
                    <Lock />
                    Account security
                </p>
                <div className="px-4">
                    <table className="table-auto border-separate border-spacing-1">
                        <tbody>
                            <tr>
                                <td className="w-[120px] text-gray-500 dark:text-gray-400">Username</td>
                                <td>{session.data?.user?.name}</td>
                            </tr>
                            <tr>
                                <td className="text-gray-500 dark:text-gray-400">Email</td>
                                <td>{session.data?.user?.email}</td>
                                <td className="flex gap-2 items-center text-blue-400 hover:text-blue-400/80 cursor-pointer"><Pencil className="h-4 w-4" />Change</td>
                            </tr>
                            <tr>
                                <td className="text-gray-500 dark:text-gray-400">Password</td>
                                <td><i>Last changed on %date%</i></td>
                                <td className="flex gap-2 items-center text-blue-400 hover:text-blue-400/80 cursor-pointer"><Pencil className="h-4 w-4" />Change</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}