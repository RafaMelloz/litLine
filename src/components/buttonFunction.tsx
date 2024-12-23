"use client"

import { confirmAlert } from "@/lib/alerts";
import { api } from "@/services/axios";
import { Button } from "./ui/button";
import useStore from "@/store/book";
import { redirect } from "next/navigation";
interface ButtonFunctionProps {
    id?: string;
    children: React.ReactNode;
    book?: any;
}

export function ButtonFunction({ id, children, book }: ButtonFunctionProps) {
    const { editingBook, selectedBook } = useStore();

    async function deleteBook(){
        confirmAlert('Deseja realmente excluir este livro?', async () => {
            const promise = api.delete('/api/book', {
                params: { id
                }
            });

            promise.finally(() => {
                window.location.reload();
            }
            );
        });
    }

    function editBook() {
        let formatedBook = {
            id: book.id,
            title: book.title,
            author: book.author,
            description: book.description,
            imageUrl: book.image
        }

        editingBook(formatedBook);
        redirect(`/newBook`);
    }

    return (
        <Button
            onClick={id ? deleteBook : editBook}
            className="w-full sm:w-auto"
        >
            {children}
        </Button>
    );
}