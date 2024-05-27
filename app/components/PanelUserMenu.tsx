"use client";

import { LogOut, Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ReactNode } from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function PanelUserMenu({ children }: { children: ReactNode }) {
	const session = useSession();
	const logout = () => {
		signOut({ redirect: false });
		redirect("/app/auth");
	}
    return (
    <DropdownMenu>
		<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
		<DropdownMenuContent className="w-56" align="end">
			<DropdownMenuLabel>User: <span className="text-blue-400">{session.data?.user?.name}</span> </DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
			<Link href="/panel/settings">
				<DropdownMenuItem className="flex gap-2 items-center cursor-pointer">
				<Settings className="h-4 w-4" />
				<span>Settings</span>
				</DropdownMenuItem>
			</Link>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
			<DropdownMenuItem className="flex gap-2 items-center cursor-pointer text-red-500" onClick={logout}>
				<LogOut className="h-4 w-4" />
				<span>Sign out</span>
			</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<div className="text-center">
				<ThemeToggleButton />
			</div>
		</DropdownMenuContent>
    </DropdownMenu>
    )
}