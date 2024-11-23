'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewBook() {
    const [book, setBook] = useState({
        title: '',
        author: '',
        description: '',
        imageUrl: ''
    })
    const [inputFileData, setInputFileData] = useState(null);

    const handleFileName = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            // Cria um objeto Blob
            const blobUrl = URL.createObjectURL(file);

            // Armazena o arquivo ou o link para uso
            console.log("Blob URL:", blobUrl);

            // Aqui você pode, por exemplo, atualizar o estado com o blob URL
            setBook(prev => ({ ...prev, imageUrl: blobUrl }))
        }
        setInputFileData(file);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setBook(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Book submitted:', book)
        console.log('Book image:', inputFileData)

    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Cadastrar Novo Livro</h1>
            <div className="grid md:grid-cols-2 gap-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Título <span className='text-red-600'>*</span></Label>
                        <Input
                            id="title"
                            name="title"
                            value={book.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="author">Autor <span className='text-red-600'>*</span></Label>
                        <Input
                            id="author"
                            name="author"
                            value={book.author}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Descrição <span className='text-red-600'>*</span></Label>
                        <Textarea
                            id="description"
                            name="description"
                            className='resize-none'
                            value={book.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {/* <div>
                        <Label htmlFor="imageUrl">URL da Imagem <span className='text-red-600'>*</span></Label>
                        <Input
                            id="imageUrl"
                            name="imageUrl"
                            type="url"
                            value={book.imageUrl}
                            onChange={handleInputChange}
                            placeholder="https://exemplo.com/imagem.jpg"
                        />
                    </div> */}
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="imageUrl">Imagem <span className='text-red-600'>*</span></Label>
                        <Input
                            id="imageUrl"
                            name="imageUrl"
                            type="file"
                            onChange={handleFileName}
                        />
                    </div>
                    <Button type="submit">Cadastrar Livro</Button>
                </form>


                <Card>
                    <CardHeader>
                        <CardTitle>Pré-visualização do Livro</CardTitle>
                    </CardHeader>

                    <CardContent className='flex justify-between w-full gap-2'>
                        <div className='w-2/3'>
                            <h2 className="text-xl font-semibold">{book.title || 'Título do Livro'}</h2>
                            <p className="text-sm text-muted-foreground">{book.author || 'Nome do Autor'}</p>
                            <p className="mt-6 text-clip break-words">{book.description || 'Descrição do livro aparecerá aqui.'}</p>
                        </div>
                        

                        {inputFileData && (
                            <img
                                src={book.imageUrl}
                                alt={book.title}
                                className="w-1/3 h-48 object-cover mb-4 rounded"
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

