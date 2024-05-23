"use client";

import ThemeToggleButton from "@/app/components/ThemeToggleButton";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import AuthSignInCard from "@/app/components/AuthSignInCard";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
    const session = useSession();
    if (session.status == "loading") return "";
    if (session.status == "authenticated") redirect("/panel");

    return (
        <div className="flex w-full p-8 justify-center">
            <Tabs defaultValue="signin" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign in</TabsTrigger>
                    <TabsTrigger value="password">Sign up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                    <AuthSignInCard />
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign up</CardTitle>
                            <CardDescription>
                                You want to do balls? Sign up to do it now!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="r_username">Username</Label>
                                <Input id="r_username" placeholder="Type your username" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="r_email">Email</Label>
                                <Input id="r_email" placeholder="Type your email" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="r_password">Password</Label>
                                <Input id="r_password" type="password" placeholder="Type your password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="r_cpassword">Confirm Password</Label>
                                <Input id="r_cpassword" type="password" placeholder="Confirm your password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Submit</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <div className="mt-2 text-center">
                    <ThemeToggleButton />
                </div>
            </Tabs>
        </div>
  )
}
