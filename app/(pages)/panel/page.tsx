import AlertBox from "@/app/components/AlertBox";
import PanelBreadcrumb from "@/app/components/PanelBreadcrumb";
import PanelCreateLinkBox from "@/app/components/PanelCreateLinkBox";
import PanelOverralStatistics from "@/app/components/PanelOverallStatistics";
import PanelURLList from "@/app/components/PanelURLList/PanelURLList";
import { ResetPasswordModal } from "@/app/components/ResetPasswordModal";
import ThemeToggleButton from "@/app/components/ThemeToggleButton";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { IPanelBreadcrumb } from "@/lib/utils";
import { Link } from "lucide-react";

const bc: IPanelBreadcrumb[] = [
  {
    name: "/",
    path: null,
  },
  {
    name: "Dashboard",
    path: "/panel"
  }
]

export default function Page() {
  return (
    <div className="container max-w-screen-lg w-full py-4">
      <PanelBreadcrumb breadcrumb={bc}/>
      <PanelCreateLinkBox />
      <PanelURLList />
      <PanelOverralStatistics />
    </div>
  )
}
