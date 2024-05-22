import { IURLData } from "@/lib/utils"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { Link } from "lucide-react"

const urls: IURLData[] = [
    {
        url: "google.com",
        domain: "ligmaballs.lgbt",
        path: "google",
        createdAt: 1716369504,
        view: 727
    },
    {
        url: "qtpc.tech",
        domain: "s.qtpc.tech",
        path: "qtpc",
        createdAt: 1716369504,
        view: 999
    },
]

export default function PanelURLList() {
    return (
        <div className="p-4 mt-4 bg-slate-100 dark:bg-slate-900 rounded-xl">
            <p className="flex gap-2 mb-2 text-lg font-bold text-blue-700 dark:text-blue-500">
                <Link />
                Your shortened links
            </p>
            <DataTable columns={columns} data={urls} />
        </div>
    )
}