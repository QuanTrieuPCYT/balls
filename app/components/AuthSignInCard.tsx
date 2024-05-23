import AlertBox from "./AlertBox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { ResetPasswordModal } from "./ResetPasswordModal";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Label } from "./ui/label";

const formSchema = z.object({
    username: z.string().min(1, 'Please type your username'),
    password: z.string().min(1, 'Please type your password'),
});

export default function AuthSignInCard() {
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isSignInError, setSignInError] = useState(false);
    const [signInMessage, setSignInMessage] = useState<string>("");

    if (isSigningIn) redirect("/panel");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: '',
          password: '',
        },
    });

    async function onSubmit({ username, password }: z.infer<typeof formSchema>) {
        try {
            const res = await signIn('credentials', {
                username,
                password,
                redirect: false,
            });
    
            if (res?.ok) {
                setIsSigningIn(true);
            } else {
                setSignInMessage("Invalid account credentials! Please try again.");
                setSignInError(true);
            }
        } catch (error) {
            setSignInMessage("Something went wrong! Please try again.");
            setSignInError(true);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign in</CardTitle>
                <CardDescription>
                Sign in to your account to do balls 🥵
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-1">
                    <AlertBox hidden={!isSignInError} color="bg-red-500" title="An error occurred!" message={signInMessage} />
                    <FormField control={form.control} name="username"
                        render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <div className="space-y-1">
                                <Label>Username</Label>
                                <Input type="username" placeholder="Type your username" {...field} />
                            </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField control={form.control} name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <div className="space-y-1">
                                <Label>Password</Label>
                                <Input type="password" placeholder="Type your password" {...field} />
                            </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="space-y-1">
                        <span className="text-sm">
                            Forgot your password?{' '}
                            <ResetPasswordModal>
                                <span className="cursor-pointer text-blue-400 hover:text-blue-400/80">Reset password</span>
                            </ResetPasswordModal>
                        </span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Submit</Button>
                </CardFooter>
                </form>
            </Form>
        </Card>
    )
}