import create from 'zustand'

type newProductData = {
    title: [],
    overview: [],
    description: [],
    marketing_angles: [],
    reviews: [],
    faqs: [],
    "after-sale": [],
    successful: [],
    influencer: [],
    email: [],
    setData: (newData: any) => void
}

const useProductData = create<newProductData>((set) => ({
    title: [],
    overview: [],
    description: [],
    marketing_angles: [],
    reviews: [],
    faqs: [],
    "after-sale": [],
    successful: [],
    influencer: [],
    email: [],
    setData: (newData: any) => set((state) => ({ ...state, ...newData }))
}))

export default useProductData