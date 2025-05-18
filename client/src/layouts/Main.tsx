import { Menu, Settings2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import AddProduct from '@/components/custom/AddProduct'
import useUser from '@/zutstand/store/user'
import { useToast } from '@/hooks/use-toast'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useAuth } from '@/services/queries'
import { useEffect } from 'react'
import English from '@/locales/en.json'
import French from '@/locales/fr.json'
import useLocale from '@/zutstand/store/locale'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import ImageGenration from "@/components/custom/ImageGenration"
import { useLocation } from "react-router-dom";
import { setupInterceptors } from '@/api/api'

function useQueryParams() {
    return new URLSearchParams(useLocation().search);
}


type Props = {
    children?: JSX.Element | JSX.Element[],
    className? : string

}



export default function MainLayout({ children, className }: Props) {
    const { setLocale, locale } = useLocale()
    const { setUser, user } = useUser()
    const { isPending, data } = useAuth()
    const { toast } = useToast()
    const query = useQueryParams();
    const paymentStatus = query.get("payment");

    const handleLogout = () => {

        if (!window.localStorage.getItem("token")) {
            return -1
        }
        window.localStorage.removeItem("token")
       //   navigate('/auth/login')
        return 0
    }



    async function authUser() {





        try {
            const res = await fetch("http://localhost:4000/auth/", {
                method: "GET",
                headers: { "authorization": String(window.localStorage.getItem("token")) }
            })

            if (res.ok) {
                const data = await res.json()
                console.log("USER ", data)
                setUser(data.user)

            } else {
                window.localStorage.removeItem("token")
            }


        } catch (error) {
            console.log("Error -- ", error)
        }
    }

    

    

    useEffect(() => {
   
        if (!user && data && data.user) {
            const user = data!.user
            setUser(user)
        }
    }, [user, setUser, data]);



    useEffect(() => {
         authUser()
    }, [])

    useEffect(() => {
        setupInterceptors(toast)
    }, [toast])

    useEffect(() => {
        if (paymentStatus) {
            // Delay execution to ensure the page is fully loaded
            setTimeout(() => {
                console.log("Payment Status:", paymentStatus);

                if (paymentStatus === "success") {
                    toast({
                        title: "🎉 Payment Successful!",
                        description: "Thank you for your purchase! Your payment was processed successfully. ✅"
                    });
                } else if (paymentStatus === "cancel") {
                    toast({
                        title: "⚠️ Payment Failed",
                        description: "Oops! Something went wrong with your payment. Please try again. ❌"
                    });
                } else {
                    toast({
                        title: "ℹ️ Payment Status",
                        description: `Your payment status is: ${paymentStatus}`
                    });
                }
            }, 500); // Delay to ensure hydration
        }
    }, [paymentStatus]);




    useEffect(() => {
        if (navigator.language == 'fr' || window.localStorage.getItem("language") == 'fr') {
            setLocale(French)
        } else {
            setLocale(English)
        }
    }, [navigator.language, window.localStorage])




    if (user) {
        return <body className='min-h-screen relative bg-body-primary flex flex-col justify-start'>

            <header className='grid z-40 fixed px-4 lg:p-4 bg-body-primary grid-cols-12 min-h-[100px] w-full'>
                <div className='lg:col-start-1 col-start-2 col-end-5 lg:col-end-3 flex flex-row justify-start items-center p-5'>
                    <Link className='w-20 flex flex-row justify-start items-center' to={'/'}>
                        <img src='/logo.png' className='w-20' />

                    </Link>
                </div>



                <div className='col-start-11 col-end-13 hidden gap-2  lg:flex flex-row items-center justify-end'>

                    <Select defaultValue={window.localStorage.getItem("language")!} onValueChange={(e) => {
                        window.localStorage.setItem("language", e)
                        if (navigator.language == 'fr' || window.localStorage.getItem("language") == 'fr') {
                            setLocale(French)
                        } else {
                            setLocale(English)
                        }
                    }}>
                        <SelectTrigger className="w-[180px] bg-[#0e1525] border-none text-white">
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent className='w-[180px]'>
                            <SelectGroup>
                                <SelectItem value="en">{locale.layout.en}</SelectItem>
                                <SelectItem value="fr">{locale.layout.fr}</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Link to={"/settings"}>
                        <Button className='px-8 py-4 rounded-md font-bold'><Settings2 size={24} /></Button>
                    </Link>
                </div>

                <div className='col-start-11 gap-2 items-center text-white col-end-13 flex flex-row items-center justify-end lg:hidden'>


                    <Select defaultValue={window.localStorage.getItem("language")!} onValueChange={(e) => {
                        window.localStorage.setItem("language", e)
                        if (navigator.language == 'fr' || window.localStorage.getItem("language") == 'fr') {
                            setLocale(French)
                        } else {
                            setLocale(English)
                        }
                    }}>
                        <SelectTrigger className="w-[180px] bg-[#0e1525] border-none text-white">
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent className='w-[180px]'>
                            <SelectGroup>
                                <SelectItem value="en">{locale.layout.en}</SelectItem>
                                <SelectItem value="fr">{locale.layout.fr}</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <DropdownMenu>
                        <DropdownMenuTrigger className='bg-[#0e1525] px-6 py-2 text-white rounded'><Menu size={24} /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem > <Link to={'/settings'}>Settings</Link></DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem > <p onClick={handleLogout} >Logout</p></DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </header>

            <main className='grid grid-cols-12 mt-24 min-h-full flex-1'>



                <section className={`${className} ${(isPending ? 'flex flex-row justify-center items-center w-full  lg:mt-0' : 'col-start-1  lg:mt-0 col-end-13 lg:col-end-11 grid grid-cols-12')}`}>
                    {
                        isPending ? <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                            <svg
                                className="text-gray-300 animate-spin"
                                viewBox="0 0 64 64"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                            >
                                <path
                                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80101 17.3837 6.66488 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                    stroke="currentColor"
                                    strokeWidth={4}
                                />
                            </svg>
                        </div> : children
                    }
                </section>


                <section className='min-h-full  lg:block  col-start-11 col-end-13'>
                    <AddProduct />
                    <ImageGenration />
                </section>

            </main>

        </body>
    }

    return <>hi</>







}