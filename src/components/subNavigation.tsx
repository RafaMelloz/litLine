"use client";

import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

export function SubNavigation() {
    const pathname = usePathname(); // Obtém o caminho da URL atual
    const paths = pathname.split("/").filter((path) => path); // Divide o caminho da URL em segmentos

    // Função para gerar rótulos amigáveis
    const getFriendlyLabel = (segment: string) => {
        // Identifica IDs de livro usando expressão regular
        const isBookId = /^cm3x[0-9a-z]+$/.test(segment);

        if (isBookId) {
            return "Livro";
        }

        // Rótulos amigáveis para outros segmentos
        const labels: Record<string, string> = {
            profile: "Perfil",
            newBook: "Novo Livro",
        };

        return labels[segment] || segment; // Retorna o segmento como está se não tiver um rótulo definido
    };

    return (
        <Breadcrumb className="mt-6">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">Inicio</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {paths.map((path, index) => {
                    const isLast = index === paths.length - 1; // Verifica se é o último item
                    const href = `/${paths.slice(0, index + 1).join("/")}`; // Monta o link incremental

                    return (
                        <React.Fragment key={href}> {/* Use React.Fragment com uma key única */}
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{getFriendlyLabel(path)}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={href}>{getFriendlyLabel(path)}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
