import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Signin",
    description: "Sheesh",
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