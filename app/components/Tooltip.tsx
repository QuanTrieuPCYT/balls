import { ReactNode } from "react";
import { Tooltip as TT, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export default function Tooltip({ children, content }: { children: ReactNode, content: ReactNode }) {
    return (
        <TooltipProvider delayDuration={0}>
            <TT>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent>
                    {content}
                </TooltipContent>
            </TT>
        </TooltipProvider>
    )
}