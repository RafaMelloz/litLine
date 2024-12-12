import { LucideCheck, LucideX } from "lucide-react";
import toast from "react-hot-toast"

export const confirmAlert = (msg: any, confirmFunction: any) => {
    toast((t) => (
        <div>
            <p>{msg}</p>

            <div className="flex justify-between gap-2 mt-5">
                <button className="dark:bg-red-500 text-white  rounded w-full flex justify-center items-center deleteButton" onClick={() => toast.dismiss(t.id)}>
                    <LucideX size={22} />
                </button>

                <button className="bg-lime-400 text-white  rounded w-full flex justify-center items-center confirmButton" onClick={() => {
                    confirmFunction(); // Executa a função de confirmação
                    toast.dismiss(t.id); // Fecha o alerta
                }}>
                    <LucideCheck size={22} />
                </button>
            </div>
        </div>
    ),
        {
            position: 'top-right',
                duration: 5000
        }
    );
};