import { IPanelBreadcrumb } from "@/lib/utils";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import Link from "next/link";

export default function PanelBreadcrumb({ breadcrumb }: { breadcrumb: IPanelBreadcrumb[] }) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
            {breadcrumb.map((n, i) => {
                return (
                    <div className="flex items-center gap-2" key={i}>
                    <BreadcrumbItem>
                        {
                            (n.path == null) ?
                            <BreadcrumbPage>{n.name}</BreadcrumbPage>
                            :
                            <BreadcrumbPage>
                            <Link href={n.path} className="text-blue-500 hover:text-blue-500/80">
                                {n.name}
                            </Link>
                            </BreadcrumbPage>
                        }
                    </BreadcrumbItem>
                    {
                        (i < breadcrumb.length - 1) ?
                        <BreadcrumbSeparator />
                        :
                        ""
                    }
                    </div>
                )
            })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}