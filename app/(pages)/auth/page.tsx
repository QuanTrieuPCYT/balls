"use client";

import ThemeToggleButton from "@/app/components/ThemeToggleButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import AuthSignInCard from "@/app/components/AuthSignInCard";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import AuthSignUpCard from "@/app/components/AuthSignUpCard";
import { global_config } from "@/lib/global";

export default function Page() {
    const session = useSession();
    if (session.status == "loading") return "";
    if (session.status == "authenticated") redirect(`/panel`);

    return (
        <div className="flex w-full p-8 justify-center">
            <Tabs defaultValue="signin" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign in</TabsTrigger>
                    <TabsTrigger value="signup">Sign up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                    <AuthSignInCard />
                </TabsContent>
                <TabsContent value="signup">
                    <AuthSignUpCard />
                </TabsContent>
                <div className="mt-2 text-center">
                    <ThemeToggleButton />
                </div>
            </Tabs>
        </div>
  )
}
