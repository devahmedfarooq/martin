import create from 'zustand'

interface User {
    subcription: String,
    email: String,
    username: String,
    product: number,
    regenerations: number,
    totalProduct : number,
    totalRegenerations : number
}

type Store = {
    user: User,
    setUser: (u: User) => void
}

const useUser = create<Store>((set) => ({
    user: {
        subcription: "",
        email: "",
        username: "",
        product: 0,
        regenerations: 0,
        totalProduct : 0,
        totalRegenerations : 0
    },
    setUser: (u: User) => set((state) => {
        
        return ({ user: u })
    
    }   )
}))


export default useUser