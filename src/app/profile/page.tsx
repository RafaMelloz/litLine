import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { auth } from "@/services/auth"
import { redirect } from "next/navigation"
import prisma from "@/services/database"
import Link from "next/link"
import { SubNavigation } from "@/components/subNavigation"

// Simulando dados do usuário com descrições e imagens para os livros


export default async function Profile() {
    const session = await auth()
    if (!session) return redirect('/')
    const books = session.user ? await prisma.books.findMany({ where: { ownerId: session.user.id } }) : []

        
    return (
        <div className="container mx-auto px-2 2xl:px-0">
            <SubNavigation/>
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={session.user?.image ?? undefined} alt={session.user?.name ?? ''} />
                            <AvatarFallback>{session.user?.name?.split(' ').map(n => n[0]).join('') ?? ''}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">{session.user?.name ?? ''}</CardTitle>
                            <CardDescription>{session.user?.email ?? ''}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <h2 className="text-xl font-semibold mb-4">Livros Registrados</h2>
                    {books.length > 0 ? (
                        <div className="space-y-4">
                            {books.map((book) => (
                                <Card key={book.id} className="flex overflow-hidden">
                                    <div className="flex-grow">
                                        <CardHeader>
                                            <CardTitle>{book.title}</CardTitle>
                                            <CardDescription>{book.author}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm truncate max-w-52">{book.description}</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Link href={`/profile/${book.id}`}>
                                                <Button>
                                                    Ver detalhes
                                                </Button>
                                            </Link>
                                        </CardFooter>
                                    </div>
                                    <div className="w-1/3 relative">
                                        <Image
                                            src={book.image}
                                            alt={`Capa do livro ${book.title}`}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="flex w-full gap-3 justify-center flex-col items-center">
                            <p>Você ainda não registrou nenhum livro</p>
                            <Button>
                                <Link href="/newBook">Vamos começar!</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

