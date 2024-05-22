"use client"

import { IURLData } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { Copy, Info, Pencil, PieChart, QrCode, Trash2 } from "lucide-react"
import Link from "next/link"
import Tooltip from "../Tooltip"


export const columns: ColumnDef<IURLData>[] = [
  {
    accessorKey: "url",
    header: "Original URL",
    cell: ({ row }) => {
        return <Link href={row.original.url} className="text-right text-blue-600 hover:text-blue-600/80 dark:text-blue-400 dark:hover:text-blue-400/80" target="_blank">{row.original.url}</Link>
    },
  },
  {
    accessorKey: "path",
    header: "Short URL",
    cell: ({ row }) => {
        const url = row.original.domain + "/" + row.original.path;
        return (
            <div className="flex gap-2 items-center">
            <Tooltip content="Copy"><Copy className="h-5 w-5 text-green-500 hover:text-green-500/80 cursor-pointer" /></Tooltip>
            <Link href={"https://" + url} className="text-right text-blue-600 hover:text-blue-600/80 dark:text-blue-400 dark:hover:text-blue-400/80" target="_blank">{url}</Link>
            </div>
        )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      return <div>{(new Date(row.original.createdAt)).toLocaleString()}</div>
    },
  },
  {
    accessorKey: "view",
    header: "Views"
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center float-right">
          <Tooltip content="Statistics"><Link href="/"><PieChart className="h-5 w-5 text-purple-400" /></Link></Tooltip>
          <Tooltip content="QR Code"><Link href="/"><QrCode className="h-5 w-5 text-gray-600 dark:text-gray-200" /></Link></Tooltip>
          <Tooltip content="Edit"><Link href="/"><Pencil className="h-5 w-5 text-orange-400" /></Link></Tooltip>
          <Tooltip content="Delete"><Link href="/"><Trash2 className="h-5 w-5 text-red-400" /></Link></Tooltip>
        </div>
      )
    },
  },
]
