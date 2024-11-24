import { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "./layouts/Main";
import { Button } from "./components/ui/button";
import { ProductData } from "./types/product";
import {
  LogOutIcon,
  ShoppingBagIcon,
  NewspaperIcon,
  ImageIcon,         // Images button
  UserIcon,          // Reviews button
  BookOpenIcon,      // Description button
  TargetIcon,      // Marketing Angles button
  HeadingIcon,       // Product Title button
  HelpCircleIcon,    // FAQs button
  ClipboardCheckIcon, // After Sale button
  AwardIcon,         // Successful Rate button
  UsersIcon,         // Influencer Brief button
  MailIcon           // Email Marketing button
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



import useItem from "./zutstand/store/item";
import useUser from './zutstand/store/user'

import useStore from "./zutstand/store/store";
import useLocale from "./zutstand/store/locale";
import LoadingBar from "./components/custom/LoadingBar";



const checkAUTH: boolean = true;



function App() {
  const navigate = useNavigate();
  const { locale } = useLocale()
  const [loading, setLoading] = useState<boolean>(false);
  const { title, description, url, language } = useStore()
  const { setUser, user } = useUser()
  const ref = useRef()
  const [data, setData] = useState<ProductData>({
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
  });


  const { item, setItem } = useItem()


  function checkIfEmpty(data: ProductData): boolean {
    let state: boolean = true
    for (let key in data) {
      // Check if the array at each key is empty
      if (data[key as keyof ProductData].length === 0) {

        state = false; // Return false as soon as we find an empty <array styleName=""></array>
        console.log(state)
        return state
      }
    }
    console.log(state)
    return state; // If all arrays are non-empty, return true
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

  const handleLogout = () => {

    if (!window.localStorage.getItem("token")) {
      return -1
    }
    window.localStorage.removeItem("token")
    setItem("")
    navigate('/auth/login')
    return 0
  }

  const handleGetByURL = useCallback(async (regen: Boolean) => {
    setLoading(true);
    if (user.product > 100 || user.regenerations > 200) {
      return alert("Subscription Limit has been reached")
    }

    try {
      const response = await fetch("http://localhost:4000/products/url-info", {
        method: "POST",
        body: JSON.stringify({ url, language, item, regen, title, description }),
        headers: {
          "Content-Type": "application/json",
          authorization: String(window.localStorage.getItem("token"))
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Data --> ", result)
      setData(result);
      await authUser()
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  }, [url, item]);


  useEffect(() => {


    if (url && item) {
      handleGetByURL(false)
    }


  }, [item])




  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      const isAuth = checkAUTH;
      if (!isAuth) {
        window.localStorage.removeItem("token");
        navigate("/auth/login");
      }
    } else {
      navigate("/auth/login");
    }
  }, [navigate]);




  return (
    <MainLayout>
      <nav className='min-h-full hidden lg:block py-4 lg:col-start-1 lg:col-end-4'>

        <div className=" hidden lg:flex flex-col gap-2 p-2">

          <button onClick={() => setItem('description')}
            className={item == 'description' ?
              'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 text-[#0a081e] rounded mr-1 hover:bg-slate-100 bg-white hover:text-primary transition-all cursor-pointer'
              :
              'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 bg-[#0a081e] rounded mr-1 hover:bg-slate-100 text-white hover:text-primary transition-all cursor-pointer'}
          > {locale.app.description} <BookOpenIcon size={28} /> </button>


          <button onClick={() => setItem('marketing_angles')}

            className={item == 'marketing_angles' ?
              'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 text-[#0a081e] rounded mr-1 hover:bg-slate-100 bg-white hover:text-primary transition-all cursor-pointer'
              :
              'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 bg-[#0a081e] rounded mr-1 hover:bg-slate-100 text-white hover:text-primary transition-all cursor-pointer'}
          > {locale.app.marketing_angle} <TargetIcon size={28} /> </button>

          <button onClick={() => setItem('images')}
            className={item == 'images' ?
              'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 text-[#0a081e] rounded mr-1 hover:bg-slate-100 bg-white hover:text-primary transition-all cursor-pointer'
              :
              'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 bg-[#0a081e] rounded mr-1 hover:bg-slate-100 text-white hover:text-primary transition-all cursor-pointer'}
          > {locale.app.images}   <ImageIcon size={28} /> </button>

          <button onClick={() => setItem('legal_policies')}
            className={item == 'legal_policies' ?
              'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 text-[#0a081e] rounded mr-1 hover:bg-slate-100 bg-white hover:text-primary transition-all cursor-pointer'
              :
              'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 bg-[#0a081e] rounded mr-1 hover:bg-slate-100 text-white hover:text-primary transition-all cursor-pointer'}
          > {locale.app.product_title}  <HeadingIcon size={28} /> </button>


          <button onClick={() => setItem('faqs')}
            className={item == 'faqs' ?
              'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 text-[#0a081e] rounded mr-1 hover:bg-slate-100 bg-white hover:text-primary transition-all cursor-pointer'
              :
              'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 bg-[#0a081e] rounded mr-1 hover:bg-slate-100 text-white hover:text-primary transition-all cursor-pointer'}

          > {locale.app.faqs} <HelpCircleIcon size={28} /> </button>
          <button onClick={() => setItem('reviews')} className={item == 'reviews' ?
            'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 text-[#0a081e] rounded mr-1 hover:bg-slate-100 bg-white hover:text-primary transition-all cursor-pointer'
            :
            'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 bg-[#0a081e] rounded mr-1 hover:bg-slate-100 text-white hover:text-primary transition-all cursor-pointer'}> {locale.app.reviews} <UserIcon size={28} /></button>
          <button onClick={() => setItem('after_sale')} className={item == 'after_sale' ?
            'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 text-[#0a081e] rounded mr-1 hover:bg-slate-100 bg-white hover:text-primary transition-all cursor-pointer'
            :
            'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 bg-[#0a081e] rounded mr-1 hover:bg-slate-100 text-white hover:text-primary transition-all cursor-pointer'}> {locale.app.after_sale} <ClipboardCheckIcon size={28} /></button>
          <button onClick={() => setItem('successful')} className={item == 'successful' ?
            'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 text-[#0a081e] rounded mr-1 hover:bg-slate-100 bg-white hover:text-primary transition-all cursor-pointer'
            :
            'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 bg-[#0a081e] rounded mr-1 hover:bg-slate-100 text-white hover:text-primary transition-all cursor-pointer'}> {locale.app.successfull_rate}<AwardIcon size={28} /></button>
          <button onClick={() => setItem('influencer')} className={item == 'influencer' ?
            'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 text-[#0a081e] rounded mr-1 hover:bg-slate-100 bg-white hover:text-primary transition-all cursor-pointer'
            :
            'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 bg-[#0a081e] rounded mr-1 hover:bg-slate-100 text-white hover:text-primary transition-all cursor-pointer'}> {locale.app.influencer_breif} <UsersIcon size={28} /></button>
          <button onClick={() => setItem('email')} className={item == 'email' ?
            'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 text-[#0a081e] rounded mr-1 hover:bg-slate-100 bg-white hover:text-primary transition-all cursor-pointer'
            :
            'text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 bg-[#0a081e] rounded mr-1 hover:bg-slate-100 text-white hover:text-primary transition-all cursor-pointer'}> {locale.app.email_marketing}<MailIcon size={28} /></button>


          <p className='text-lg border-slate-100  border flex flex-row justify-between items-center gap-2  p-4 rounded bg-[#0a081e] mr-1 hover:bg-slate-100 hover:text-primary text-white transition-all cursor-pointer' onClick={handleLogout}> {locale.app.logout} <LogOutIcon size={28} />   </p>
        </div>
      </nav>

      <main className="relative col-start-2 lg:mt-0 mt-52 lg:col-start-4 col-end-12">

        <section className="lg:hidden text-white flex flex-row justify-start items-center gap-4">
          <label>Generate: </label>
          <Select onValueChange={(e) => setItem(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="What to generate?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="description">{locale.app.description}</SelectItem>
              <SelectItem value="email">{locale.app.email_marketing}</SelectItem>
              <SelectItem value="marketing_angles">{locale.app.marketing_angle}</SelectItem>
              <SelectItem value="title">{locale.app.product_title}</SelectItem>
              <SelectItem value="faqs">{locale.app.faqs}</SelectItem>
              <SelectItem value="reviews">{locale.app.reviews}</SelectItem>
              <SelectItem value="after_sale">{locale.app.after_sale}</SelectItem>
              <SelectItem value="successful">{locale.app.successfull_rate}</SelectItem>
              <SelectItem value="influencer">{locale.app.influencer_breif}</SelectItem>
            </SelectContent>
          </Select>

        </section>
        <section className="p-5  ">
          <div className="flex flex-col md:flex-row mb-2 justify-between gap-4">
            <div className="text-white gap-4 flex-col" >
              <p className="text-2xl md:text-4xl font-light"> {title} </p>
              <p className="text-sm md:text-md font-light" style={{
                display: item ? "none" : "block"
              }}> {description}</p>
            </div>

            <div className="flex flex-row justify-between lg:gap-4" >

              <Button style={{
                display: item || (checkIfEmpty(data) || loading) ? "block" : "none"
              }} onClick={() => {
                navigator.clipboard.writeText(ref.current.innerText)

              }}>
                Copy
              </Button>
              <Button onClick={() => handleGetByURL(true)} style={{
                display: item || (checkIfEmpty(data) || loading) ? "block" : "none"
              }}>{locale.app.regenrate}</Button>
            </div>
          </div>
          <section>

            {
              !data[item] && !loading ? <div className="flex flex-row justify-center items-center min-h-[70vh]"> <img className="w-96" src="/robot.png" /></div> : loading ?  /* <div className="flex flex-row justify-center items-center min-h-[70vh]"> <img className="w-96" src="/robot.png" /></div>  :   loading ? <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
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
              </div>  */ <LoadingBar /> : data[item]?.map((e, idx) => (
                <div ref={ref} className="text-white gap-4 max-h-[60vh] lg:max-h-[500px] overflow-y-scroll flex-col flex " key={idx} dangerouslySetInnerHTML={{ __html: String(e) }}></div>
              ))
            }
          </section>
        </section>
      </main>
    </MainLayout>
  );
}
export default App;