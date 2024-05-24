import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import z from "zod";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useState } from "react";
import AlertBox from "./AlertBox";

const formSchema = z.object({
    username: z.string().min(1, 'Please type your username'),
    email: z.string().min(1, 'Please type your email').email('Invalid email format'),
    password: z.string().min(8, 'Please type your password'),
    confirm_password: z.string().min(8, 'Please confirm your password'),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
});

type SignUpAlert = {
    title: string,
    color: string,
    message: string,
}

export default function AuthSignUpCard() {
    const [isSignUpError, setSignUpError] = useState<boolean>(false);
    const [signUpMessage, setSignUpMessage] = useState<SignUpAlert>({title: "", color: "", message: ""});

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: '',
          email: '',
          password: '',
          confirm_password: ''
        },
    });

    async function onSubmit({ username, email, password }: z.infer<typeof formSchema>) {
        try {
            const req = await axios.post('/app/api/auth/signup', { username, email, password });
            if (req.status == 201) {
                setSignUpError(true);
                setSignUpMessage({ title: "Success!", color: "bg-green-500", message: "Successfully signed you up! Please check your mailbox for verification link." });
            }
        } catch (e: any) {
            setSignUpError(true);
            setSignUpMessage({ title: "An error occurred!", color: "bg-red-500", message: e.response.data.message });
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign up</CardTitle>
                <CardDescription>
                    You want to do balls? Sign up to do it now!
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-2">
                        <AlertBox hidden={!isSignUpError} color={signUpMessage.color} title={signUpMessage.title} message={signUpMessage.message} />
                        <FormField control={form.control} name="username"
                            render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                <div className="space-y-1">
                                    <Label>Username</Label>
                                    <Input placeholder="Type your username" {...field} />
                                </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField control={form.control} name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                <div className="space-y-1">
                                    <Label>Email</Label>
                                    <Input placeholder="Type your email" {...field} />
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
                        <FormField control={form.control} name="confirm_password"
                            render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                <div className="space-y-1">
                                    <Label>Confirm Password</Label>
                                    <Input type="password" placeholder="Confirm your password" {...field} />
                                </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Submit</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}