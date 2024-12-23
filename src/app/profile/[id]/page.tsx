import Image from "next/image"
import Link from "next/link"
import prisma from "@/services/database"

import { auth } from "@/services/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SubNavigation } from "@/components/subNavigation"
import { ButtonFunction } from "@/components/buttonFunction"

type paramsType = Promise<{ id: string }>;

export default async function MyBook({ params }: { params: paramsType }) {
    const session = await auth();
    const {id} = await params;

    if (!session) {
        return redirect('/');
    }

    const user = session?.user?.id;
    const book = await prisma.books.findFirst({
        where: { id, ownerId: user }
    });
    if (!book) {
        return redirect('/profile');
    }

    return (
        <div className="container mx-auto px-2 2xl:px-0">
            <SubNavigation />
            <Card className="w-full max-w-3xl mx-auto mt-2">
                <CardHeader className="relative">
                    <div>
                        <CardTitle className="text-2xl">{book.title}</CardTitle>
                        <CardDescription>{book.author}</CardDescription>
                    </div>
                    <Image
                        src={book.image}
                        alt={`Capa do livro ${book.title}`}
                        width={125}
                        height={100}
                        className="rounded-md shadow-md absolute top-0 right-0"
                    />
                </CardHeader>

                <CardContent>
                    <p className="mb-4 max-w-96 w-full">{book.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <strong>Data de publicação:</strong> {new Date(book.createdAt).toLocaleDateString('pt-BR')}
                        </div>
{/* 
                        <div>
                            <strong>Gênero:</strong> Ação
                        </div> */}
                    </div>
                </CardContent>
                
                <CardFooter className="flex flex-col sm:flex-row gap-4">
                    <ButtonFunction book={book}>
                        Editar
                    </ButtonFunction>

                    <ButtonFunction id={book.id}>
                        Apagar
                    </ButtonFunction>
                </CardFooter>
            </Card>

            <div className="mt-4 text-center">
                <Link href="/profile" passHref>
                    <Button variant="outline">Voltar para o Perfil</Button>
                </Link>
            </div>
        </div>
    );
}
