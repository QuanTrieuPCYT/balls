import { Eye, Link as LinkIcon, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import Link from "next/link";

export default function PanelOverralStatistics() {
    return (
        <div className="container p-4 mt-4 bg-slate-100 dark:bg-slate-900 rounded-xl">
            <p className="flex gap-2 text-lg font-bold mb-2 text-blue-700 dark:text-blue-500">
                <PieChart />
                Overall statistics
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Card className="max-md:col-span-2 group relative p-4 bg-gray-200 dark:bg-gray-800/50">
                    <p className="relative z-10 text-sm text-blue-500 font-medium">Total links</p>
                    <span className="relative z-10 text-2xl font-bold">1,234,567,890</span>
                    <LinkIcon className="z-0 absolute top-2 right-2 w-16 h-16 text-blue-500/60 group-hover:scale-110 duration-300" />
                </Card>
                <Card className="max-md:col-span-2 group relative p-4 bg-gray-200 dark:bg-gray-800/50">
                    <p className="relative z-10 text-sm text-green-500 font-medium">Total views</p>
                    <span className="relative z-10 text-2xl font-bold">1,234,567,890</span>
                    <Eye className="z-0 absolute top-2 right-2 w-16 h-16 text-green-500/60 group-hover:scale-110 duration-300" />
                </Card>
                <Card className="group relative p-4 bg-gray-200 dark:bg-gray-800/50 col-span-2">
                    <p className="relative z-10 text-sm text-green-500 font-medium">Most views</p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[20px]"></TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead className="text-center">Views</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-center">1</TableCell>
                                <TableCell>
                                    <Link href="https://s.qtpc.tech/qtpc" target="_blank" className="text-blue-600 hover:text-blue-600/80 dark:text-blue-500 dark:hover:text-blue-500/80">
                                        s.qtpc.tech/qtpc
                                    </Link>
                                </TableCell>
                                <TableCell className="text-center">999</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">2</TableCell>
                                <TableCell>
                                    <Link href="https://ligmaballs.lgbt/google" target="_blank" className="text-blue-600 hover:text-blue-600/80 dark:text-blue-500 dark:hover:text-blue-500/80">
                                        ligmaballs.lgbt/google
                                    </Link>
                                </TableCell>
                                <TableCell className="text-center">727</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </div>
            
        </div>
    )
}