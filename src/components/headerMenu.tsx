"use client"

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { AlignJustify, Loader2, LogOut, Plus, User, Home, Github } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";

export function HeaderMenu(){
    const {status} = useSession();

    async function handleLogin() {
        await signIn("github")
    }

    async function handleLogout() {
        await signOut()
    }

    return (
        <header className={`py-4 px-2 2xl:px-0 flex container mx-auto ${status === "authenticated" ? "justify-between" : "justify-end" }`}>
            {status === "authenticated" && (
                <Image 
                    src={"/litline.png"} alt={"Logo"} width={128} height={26}
                />
            )}

            {status === "authenticated" && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <AlignJustify size={20}/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                        <DropdownMenuLabel>Conta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Link href={'/profile'} ><User /></Link>
                                <Link href={'/profile'} >Perfil</Link>
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem>
                                <Link href={'/newBook'} ><Plus /></Link>
                                <Link href={'/newBook'} >Novo Livro</Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            <Link href={'/'} ><Home /></Link>
                            <Link href={'/'} >Home</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut />
                            <span>Sair</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            {status === "unauthenticated" && (
                <Button onClick={handleLogin}>
                    <p className="flex items-center gap-1.5 font-semibold"> Login com <Github strokeWidth={3}/></p>
                </Button>
            )}

            {status === "loading" && (
                <Button disabled>
                    <Loader2 className="animate-spin" />
                </Button>
            )}
        </header>
    )
}