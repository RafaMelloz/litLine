"use client"

import { confirmAlert } from "@/lib/alerts";
import { api } from "@/services/axios";
import { Button } from "./ui/button";

export function ButtonDelete({id } : {id: string}) {

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


    
    return (
        <Button
            onClick={deleteBook}
            className="w-full sm:w-auto"
        >
            Apagar
        </Button>
    );
}