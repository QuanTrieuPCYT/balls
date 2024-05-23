import { global_config } from "@/lib/global";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Account Settings | " + global_config.siteName,
    description: global_config.siteDescription,
};
  
export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
  }