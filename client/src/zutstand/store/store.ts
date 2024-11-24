import create from 'zustand'

type Store = {
    title: string,
    description: string,
    url: string,
    language: string,
    setUrl: (newUrl: string) => void,
    setTitle: (newTitle: string) => void,
    setDescription: (newDesc: string) => void,
    setLanguage: (newLanguage: string) => void
}

const useStore = create<Store>((set) => ({
    title: '',
    description: '',
    url: '',
    language: '',
    setTitle: (newTitle: string) => set((state) => ({ title: newTitle })),
    setUrl: (newUrl: string) => set((state) => ({ url: newUrl })),
    setDescription: (newDesc: string) => set((state) => ({ description: newDesc })),
    setLanguage: (newLanguage: string) => set((state) => ({ language: newLanguage }))
}))

export default useStore