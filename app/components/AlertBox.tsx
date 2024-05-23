import { cn } from "@/lib/utils";

export default function AlertBox({ hidden, color, title, message }: { hidden: boolean, color: string, title: string, message: string}) {
    return (
        <div className={cn(`flex px-4 py-2 rounded-md`, color, hidden ? "hidden" : "visible")}>
            <div>
                <p className="text-base font-semibold">{title}</p>
                <p className="text-sm">{message}</p>
            </div>
        </div>
    )
}