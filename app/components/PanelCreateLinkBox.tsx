"use client";

import { ArrowDown, CalendarIcon, Copy, Scissors, Send, Settings, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { IDomainData, IShortenURL, cn, generateToken } from "@/lib/utils";
import { FormEventHandler, useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Id, toast } from 'react-toastify';
import axios, { AxiosError } from "axios";
import Tooltip from "./Tooltip";

const formSchema = z.object({
    url: z.string(),
    path: z.string().optional(),
    domain: z.string().optional(),
})

export default function PanelCreateLinkBox() {
    const [date, setDate] = useState<Date>();
    const [domains, setDomains] = useState<IDomainData[]>([]);
    const [pass, setPass] = useState<string>("");
    const [successData, setSuccessData] = useState<IShortenURL>({ path: "", expireAt: null, password: "", url: "", domain: ""});
    const [successDialog, setSuccessDialog] = useState<boolean>(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          url: '',
          path: '',
          domain: "1",
        },
    });

    async function onSubmit({ url, path, domain }: z.infer<typeof formSchema>) {
        const expiry = date ? date : -1;
        if (!url.match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi))
            return toast.error('Invalid URL!', { closeOnClick: true, autoClose: 3000, pauseOnFocusLoss: false, pauseOnHover: false, toastId: "url-error" });

        if (path && !path.match(/^\w+$/))
            return toast.error('Path cannot contain special characters!', { closeOnClick: true, autoClose: 3000, pauseOnFocusLoss: false, pauseOnHover: false, toastId: "path-error" });

        if (expiry != -1 && (new Date(expiry)).getTime() < Date.now())
            return toast.error('Provided expiry date is in the past!', { closeOnClick: true, autoClose: 3000, pauseOnFocusLoss: false, pauseOnHover: false, toastId: "date-error" });
        
        try {
            const query = await axios.post("/app/api/links", {
                url: url,
                path: path,
                domain: domain,
                expire: expiry,
                password: pass,
            });
            const data = query.data;
            setSuccessData({ path: data.path, expireAt: data.expireAt, password: pass, url: data.url, domain: data.domain });
            setSuccessDialog(true);
        } catch (e) {
            return toast.error(e.response.data.error, { closeOnClick: true, autoClose: 3000, pauseOnFocusLoss: false, pauseOnHover: false, toastId: "axios-error" });
        }
    }

    useEffect(() => {
        fetchDomains();
    }, [])

    async function fetchDomains() {
        const getDomains = await axios.get("/app/api/links?domain");
        domains.splice(0, domains.length);
        getDomains.data.forEach((x: IDomainData) => {
            domains.push({
                id: x.id,
                domain: x.domain,
                verified: x.verified
            })
        })
    }

    return (
        <div className="container p-4 mt-4 bg-slate-100 dark:bg-slate-900 rounded-xl">
            <p className="flex gap-2 text-lg font-bold mb-2 text-blue-700 dark:text-blue-500">
                <Scissors />
                Shorten your link
            </p>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name="url"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                        <div>
                            <div className="flex items-center rounded-xl bg-slate-200 has-[:focus]:bg-slate-400/50 dark:bg-slate-800/50 dark:has-[:focus]:bg-slate-800">
                                <input 
                                    className="px-8 py-4 w-full rounded-lg bg-transparent peer dark:text-white outline-none placeholder-gray-500/80 dark:placeholder-gray-600"
                                    placeholder="Paste your long URL"
                                    {...field}
                                />
                                <Button type="submit" className="bg-blue-500 hover:bg-blue-500/70 peer-placeholder-shown:opacity-50 peer-placeholder-shown:cursor-default peer-placeholder-shown:hover:bg-blue-500 rounded-md mr-3" variant="ghost">
                                    <Send className="h-6 w-6 text-white" />
                                </Button>
                            </div>
                            <FormMessage className="ml-2 text-base text-red-500" />
                        </div>
                        </FormControl>
                    </FormItem>
                    )}
                />
                <Dialog>
                    <DialogTrigger>
                        <span className="cursor-pointer ml-2 text-gray-800/60 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                            Advanced options
                        </span>
                    </DialogTrigger>
                    <DialogContent
                        className="max-w-screen-sm"
                        onInteractOutside={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <DialogHeader>
                            <DialogTitle>Shorten Link</DialogTitle>
                            <DialogDescription>
                                Advanced options
                            </DialogDescription>
                        </DialogHeader>
                        <FormField control={form.control} name="path"
                            render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="space-y-1">
                                        <Label htmlFor="path">Custom path</Label>
                                        <Input id="path" className="peer" placeholder="Leave blank for random" {...field} />
                                        <FormMessage className="ml-2 text-base text-red-500" />
                                    </div> 
                                </FormControl>
                            </FormItem>
                            )}
                        />
                        <FormField control={form.control} name="domain"
                            render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="space-y-1">
                                        <Label>Domain</Label>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent {...field}>
                                            {
                                                domains.map((n, i) => {
                                                    return (n.verified ? <SelectItem value={n.id.toString()} key={i}>{n.domain}</SelectItem> : "")
                                                })
                                            }
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </FormControl>
                            </FormItem>
                            )}
                        />
                        <div className="space-y-1">
                            <Label>Expire at</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password Protection</Label>
                            <div id="password" className="grid grid-cols-5 gap-2">
                                <Input className="col-span-3" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Leave blank for no password" />
                                <Button onClick={() => { 
                                    const _pass = generateToken(12, true, true, true);
                                    setPass(_pass);
                                }} className="col-span-2 bg-blue-500 hover:bg-blue-500/80 text-white hover:text-white" variant="ghost">Generate a password</Button>
                            </div>
                        </div>
                        <DialogClose asChild>
                            <Button>Close</Button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
            </form>
            </Form>
            <Dialog open={successDialog} onOpenChange={() => setSuccessDialog(!successDialog)}>
                <DialogContent
                    className="max-w-screen-sm"
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Successfully shortened your link!</DialogTitle>
                    </DialogHeader>
                    <p className="text-xl text-green-500">{successData.url}</p>
                    <ArrowDown />
                    <p className="cursor-pointer text-3xl font-bold text-blue-500 hover:text-blue-500/80" onClick={() => {
                        navigator.clipboard.writeText(successData.domain + "/" + successData.path)
                        toast.success('Copied to clipboard!', { closeOnClick: true, autoClose: 3000, pauseOnFocusLoss: false, pauseOnHover: false, toastId: "copied" });
                    }}>
                        {successData.domain + "/" + successData.path} 
                    </p>
                    { successData.expireAt ? <span>Your link will expire at: {(new Date(successData.expireAt)).toLocaleDateString()}</span> : "" }
                    { successData.expireAt ? <><p>Your link password is: <span className="text-red-400 font-bold">{successData.password}</span><br /><span className="text-sm">The password will not be shown again. Save it somewhere else!</span></p></> : "" }
                    <DialogClose asChild>
                        <Button>Got it!</Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    )
}