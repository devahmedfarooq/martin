import create from 'zustand'

type Store = {
    item: string,
    setItem: (i: string) => void
}

const useItem = create<Store>((set) => ({
    item: "",
    setItem: (i: string) => set(() => ({ item: i }))
}))

export default useItem