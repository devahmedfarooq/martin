import Locale from '@/types/locale'
import create from 'zustand'
import English from '@/locales/en.json'
type Store = {
    locale: Locale,
    setLocale: (i: Locale) => void
}

const useLocale = create<Store>((set) => ({
    locale: English,
    setLocale: (i: Locale) => set(() => ({ locale: i }))
}))

export default useLocale