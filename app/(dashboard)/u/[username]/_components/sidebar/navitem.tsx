"use client";

import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavItemProps {
    icon : LucideIcon;
    label : string;
    href : string;
    isActive : boolean;


}

export const NavItem = ({
    icon : Icon,
    label,href,isActive
}:NavItemProps) => {
    const { collapsed } = useCreatorSidebar((state) => state);

    return(
        <Button 
        asChild
        variant="ghost"
        className={cn(
            "w-full h-12",
            collapsed ? "justify-center":"justify-start",
            isActive && "bg-accent",
        )} >

             <Link href={href}>
                <div className="flex items-center gap-x-4">
                    <Icon className={cn(
                        "h-4 w-4",
                        collapsed ? "mr-0" : "mr-2"
                    )}/>
                    {!collapsed &&
                    (
                        <span>{label}</span>
                    ) 
                    }
                </div>
             </Link>
        </Button>
    )

}