import create from 'zustand'


interface Image {
    img: string,
    prompt: string,
    size: string,
    name?: string
}


type Store = {
    title: string,
    description: string,
    url: string,
    language: string,
    images: Image[],
    image: Image,
    setUrl: (newUrl: string) => void,
    setTitle: (newTitle: string) => void,
    setDescription: (newDesc: string) => void,
    setLanguage: (newLanguage: string) => void,
    setImages: (newImages: Image[]) => void,
    setImage: (newImage: Image) => void
}

const useStore = create<Store>((set) => ({
    title: '',
    description: '',
    url: '',
    language: '',
    images: [],
    image: { prompt: '', size: '', img: '', name: '' },
    setTitle: (newTitle: string) => set(() => ({ title: newTitle })),
    setUrl: (newUrl: string) => set(() => ({ url: newUrl })),
    setDescription: (newDesc: string) => set(() => ({ description: newDesc })),
    setLanguage: (newLanguage: string) => set(() => ({ language: newLanguage })),
    setImages: (newImage: Image[]) => set(() => ({ images: newImage })),
    setImage: (newImage: Image) => set(() => ({ image: newImage }))

}))

export default useStore