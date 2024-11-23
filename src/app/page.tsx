import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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


      <main className="container mx-auto py-4 px-2 2xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Cartão {index + 1}</CardTitle>
                <CardDescription>Descrição do cartão {index + 1}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Conteúdo do cartão {index + 1}</p>
              </CardContent>
              <CardFooter>
                <Button>Ação</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
      </main>
    </div>
  )
}

