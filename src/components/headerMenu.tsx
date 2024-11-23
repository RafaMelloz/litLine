"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { AlignJustify, Loader2, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function HeaderMenu(){
    const {data, status} = useSession();

    async function handleLogin() {
        await signIn("github")
    }

    async function handleLogout() {
        await signOut()
    }

    return (
        <header className={`py-4 px-2 2xl:px-0 flex container mx-auto ${status === "authenticated" ? "justify-between" : "justify-end" }`}>
            {status === "authenticated" && (
                <div className="flex items-center justify-center gap-2">
                    {data?.user?.image && (
                        <Avatar>
                            <AvatarImage src={data.user.image} alt="Foto de perfil" />
                            <AvatarFallback>?</AvatarFallback>
                        </Avatar>
                    )}
                    <h2 className="font-bold text-lg">
                        {data?.user?.name}
                    </h2>
                </div>
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
                                <User />
                                <span>Perfil</span>
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem>
                                <Plus />
                                <span>Novo livro</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                
                        <DropdownMenuSeparator />
                
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut />
                            <span>Sair</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            {status === "unauthenticated" && (
                <Button onClick={handleLogin}>
                    <b>Login</b>
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