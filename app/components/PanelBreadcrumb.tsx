import { IPanelBreadcrumb } from "@/lib/utils";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";

export default function PanelBreadcrumb({ breadcrumb }: { breadcrumb: IPanelBreadcrumb[] }) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
            {breadcrumb.map((n, i) => {
                return (
                    <>
                    <BreadcrumbItem>
                        {
                            (n.path == null) ?
                            <BreadcrumbPage>{n.name}</BreadcrumbPage>
                            :
                            <BreadcrumbLink href={n.path}>{n.name}</BreadcrumbLink>
                        }
                    </BreadcrumbItem>
                    {
                        (i < breadcrumb.length - 1) ?
                        <BreadcrumbSeparator />
                        :
                        ""
                    }
                    </>
                )
            })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}