import { create } from "zustand"

interface Book{
    id: string;
    title: string;
    description: string;
    author: string;
    imageUrl: string;
}

interface StoreState {
    selectedBook?: Book; // usuário selecionado
    editingBook: (book: Book | undefined) => void;  // guarda o usuario selecionado
}

const useStore = create<StoreState>((set) => ({
    selectedBook: undefined,
    editingBook: (book) => set({ selectedBook: book }),

}));

export default useStore;