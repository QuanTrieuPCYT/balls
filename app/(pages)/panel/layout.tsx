import PanelNavigationBar from "@/app/components/PanelNavigationBar";
import { global_config } from "@/lib/global";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | " + global_config.siteName,
    description: global_config.siteDescription,
};
  
export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <PanelNavigationBar />
            {children}
        </>
    );
  }