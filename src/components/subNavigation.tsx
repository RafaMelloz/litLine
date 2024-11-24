import Link from "next/link"

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function SubNavigation({local} : {local: string}){
    return(
        <Breadcrumb className="mt-6">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">Inicio</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                                
                <BreadcrumbSeparator />
                
                <BreadcrumbItem>
                    <BreadcrumbPage>{local}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}