import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const books = [
  { title: "O Senhor dos Anéis", author: "J.R.R. Tolkien", image: "/placeholder.svg?height=200&width=150" },
  { title: "Harry Potter", author: "J.K. Rowling", image: "/placeholder.svg?height=200&width=150" },
  { title: "1984", author: "George Orwell", image: "/placeholder.svg?height=200&width=150" },
  { title: "Dom Quixote", author: "Miguel de Cervantes", image: "/placeholder.svg?height=200&width=150" },
  { title: "Cem Anos de Solidão", author: "Gabriel García Márquez", image: "/placeholder.svg?height=200&width=150" },
  { title: "A Metamorfose", author: "Franz Kafka", image: "/placeholder.svg?height=200&width=150" },
]


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full h-72 bg-[url('../../public/image.png')] bg-cover bg-center relative 2xl:hidden bg-fixed">
        <div className="text-slate-100 font-semibold italic absolute bottom-5 left-6">
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


      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, index) => (
            <Card key={index} className="flex overflow-hidden">
              <div className="flex-grow">
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                  <CardDescription>{book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Um livro fascinante que cativa os leitores.</p>
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

