"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import PanelUserMenu from "./PanelUserMenu";
import { useSession } from "next-auth/react";
import { global_config } from "../../lib/global";

export default function PanelNavigationBar() {
    const session = useSession();
    if (session.status == "loading") return "";

    return (
        <header className={cn("z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-lg")}>
            <div className="container flex h-14 max-w-screen-lg items-center justify-between">
                <Link href={global_config.proxied_path + "/panel"} className="flex items-center gap-4 mr-4">
                    <span className="font-bold text-gray-300 hover:text-purple-400 duration-300">{global_config.siteName}</span>
                </Link>
                <PanelUserMenu>
                    <div className="bg-slate-800 dark:bg-white rounded-full h-10 w-10 cursor-pointer hover:bg-pink-300 duration-300"></div>
                </PanelUserMenu>
            </div>
        </header>
    )
}