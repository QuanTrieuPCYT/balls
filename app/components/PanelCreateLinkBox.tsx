"use client";

import { CalendarIcon, Scissors, Send, Settings, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";

export default function PanelCreateLinkBox() {
    const [date, setDate] = useState<Date>();
    return (
        <div className="container p-4 mt-4 bg-slate-100 dark:bg-slate-900 rounded-xl">
            <p className="flex gap-2 text-lg font-bold mb-2 text-blue-700 dark:text-blue-500">
                <Scissors />
                Shorten your link
            </p>
            <div className="flex items-center rounded-xl bg-slate-200 has-[:focus]:bg-slate-400/50 dark:bg-slate-800/50 dark:has-[:focus]:bg-slate-800">
                <input 
                    className="px-8 py-4 w-full rounded-lg bg-transparent peer dark:text-white outline-none placeholder-gray-500/80 dark:placeholder-gray-600"
                    placeholder="Paste your long URL"
                />
                <Button className="bg-blue-500 hover:bg-blue-500/70 peer-placeholder-shown:opacity-50 peer-placeholder-shown:cursor-default peer-placeholder-shown:hover:bg-blue-500 rounded-md mr-3" variant="ghost">
                    <Send className="h-6 w-6 text-white" />
                </Button>
            </div>
            <p className="ml-2 text-red-500">Error</p>
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
                    <div className="space-y-1">
                        <Label htmlFor="address">Custom path</Label>
                        <Input id="address" className="peer" placeholder="Leave blank for random" />
                        <p className="text-sm text-red-600 hidden peer-invalid:visible">Error</p>
                    </div>
                    <div className="space-y-1">
                        <Label>Domain</Label>
                        <Select defaultValue="domain1">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="domain1">ligmaballs.lgbt</SelectItem>
                                <SelectItem value="domain2">link.lt.id.vn</SelectItem>
                                <SelectItem value="domain3">s.qtpc.tech</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1">
                        <Label>Expire in</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <Input className="" placeholder="Leave blank for no expiry" />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
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
                        <span className="text-sm text-red-600">
                            Clear expiry date
                        </span>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password Protection</Label>
                        <div id="password" className="grid grid-cols-5 gap-2">
                            <Input className="col-span-3" placeholder="Leave blank for no password" />
                            <Button className="col-span-2 bg-blue-500 hover:bg-blue-500/80 text-white hover:text-white" variant="ghost">Generate a password</Button>
                        </div>
                    </div>
                    <Button>Confirm</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}