import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/services/database";
import Image from "next/image";

export default async function Home() {

  const books = await prisma.books.findMany()

  return (
    <div>
      <div className="w-full h-72 bg-[url('../../public/image.png')] bg-cover bg-center relative 2xl:hidden bg-fixed">
        <div className="text-slate-100 font-semibold italic absolute bottom-5 left-9">
          <h1 className="text-7xl">LitLine</h1>
          <h3 className="text-xl">Reserva de livros</h3>
        </div>
      </div>

      <div className="w-full h-96 bg-[url('../../public/image.png')] bg-cover bg-center relative hidden container mx-auto 2xl:block rounded-lg bg-fixed">
        <div className="text-slate-100 font-semibold italic absolute bottom-5 left-6">
          <h1 className="text-7xl">LitLine</h1>
          <h3 className="text-xl">Reserva de livros</h3>
        </div>
      </div>

      <main className="container mx-auto py-4 px-2 2xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, index) => (
            <Card key={index} className="flex overflow-hidden">
              <div className="flex-grow">
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                  <CardDescription>{book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm  truncate max-w-52">{book.description}</p>
                </CardContent>
                <CardFooter>
                  <Button>Ler mais</Button>
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
      </main>
    </div>
  )
}

