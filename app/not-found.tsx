import { Metadata } from "next";
import { global_config } from "../lib/global";
import { headers } from "next/headers";

export const metadata: Metadata = {
    title: "Not Found | " + global_config.siteName,
    description: global_config.siteDescription,
};

export default function Page() {
    const headersList = headers();
    return (
        <div className="absolute h-full w-full bg-black flex items-center justify-center">
            <div className="md:flex -mt-32">
                <img src="/astronaut.png" alt="" height={300} width={300} className="drop-shadow-[0_16px_16px_rgba(255,255,255,0.5)]" />
                <div className="flex flex-col justify-center">
                    <p className="text-4xl font-bold" style={{ textShadow: '0 0 20px #fff'}}>404 Not Found</p>
                    <p className="mt-1">The request URL cannot be found.</p>
                    <p className="mt-5">You are not lost. You just can&#39;t find the right path.</p>
                </div>
            </div>
        </div>
    )
}