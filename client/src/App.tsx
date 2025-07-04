import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "./layouts/Main";
import { ProductData } from "./types/product";
import {
  LogOutIcon,
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
import ImageGenrateBox from "./components/custom/ImageGenrateBox";
import DynamicRenderer from "./components/custom/DynamicRender";
import ButtonSection from "./components/custom/ActionGroupButton";
import LinkButton from "./components/custom/LinkButton";



const checkAUTH: boolean = true;



function App() {
  const navigate = useNavigate();
  const { locale } = useLocale()
  const [loading, setLoading] = useState<boolean>(false);
  const { title, description, url, language } = useStore()
  const {  user } = useUser()
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


  /*   function checkIfEmpty(data: ProductData): boolean {
      let state: boolean = true
      for (let key in data) {
        // Check if the array at each key is empty
        if (data[key as keyof ProductData].length === 0) {
  
          state = false; // Return false as soon as we find an empty <array styleName=""></array>
          //     console.log(state)
          return state
        }
      }
      console.log(state)
      return state; // If all arrays are non-empty, return true
    } */


  /*   async function authUser() {
  
      try {
        const res = await fetch("https://server-delicate-glade-3069.fly.dev/auth/", {
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
    } */

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
      const response = await fetch("https://server-delicate-glade-3069.fly.dev/products/url-info", {
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
      //await authUser()
    } catch (error) {
      //  console.log(error?.message);
    } finally {
      setLoading(false);
    }
  }, [url, item]);


  useEffect(() => {


    if (url && item) {
      if (item !== 'images') {
        handleGetByURL(false)
      }
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
    <MainLayout className="mt-52">

      <p style={{ zIndex: "100" }} className='text-lg fixed hidden lg:flex  bottom-2 right-5 border-slate-100  border  flex-row justify-between items-center gap-2  p-4 rounded bg-[#0a081e] mr-1 hover:bg-slate-100 hover:text-primary text-white transition-all cursor-pointer' onClick={handleLogout}> {locale.app.logout} <LogOutIcon size={28} />   </p>


      <nav className='min-h-full hidden lg:block py-4 lg:col-start-1 lg:col-end-4'>

        <div className=" hidden lg:flex flex-col gap-2 p-2">


          {
            user.totalProduct >= 5 && <LinkButton url={url} item={item} setItem={setItem} name="description">
              {locale.app.description} <BookOpenIcon size={28} />
            </LinkButton>
          }


          {
            user.totalProduct >= 5 &&
            <LinkButton url={url} item={item} setItem={setItem} name="marketing_angles">
              {locale.app.marketing_angle} <TargetIcon size={28} />
            </LinkButton>
          }

          {
            user.totalProduct > 15 &&
            <LinkButton url={url} item={item} setItem={setItem} name="legal_policies">
              {locale.app.product_title} <HeadingIcon size={28} />
            </LinkButton>

          }

          {
            user.totalProduct >= 5 && <LinkButton url={url} item={item} setItem={setItem} name="faqs">
              {locale.app.faqs} <HelpCircleIcon size={28} />
            </LinkButton>
          }

          {
            user.totalProduct >= 5 && <LinkButton url={url} item={item} setItem={setItem} name="reviews">
              {locale.app.reviews} <UserIcon size={28} />
            </LinkButton>

          }
          {
            user.totalProduct > 15 &&
            <LinkButton url={url} item={item} setItem={setItem} name="after_sale">
              {locale.app.after_sale} <ClipboardCheckIcon size={28} />
            </LinkButton>
          }
          {
            user.totalProduct > 15 &&
            <LinkButton url={url} item={item} setItem={setItem} name="successful">
              {locale.app.successfull_rate} <AwardIcon size={28} />
            </LinkButton>
          }

          {
            user.totalProduct >= 15 &&
            <LinkButton url={url} item={item} setItem={setItem} name="influencer">
              {locale.app.influencer_breif} <UsersIcon size={28} />
            </LinkButton>
          }
          {
            user.totalProduct > 15 && <LinkButton url={url} item={item} setItem={setItem} name="email">
              {locale.app.email_marketing} <MailIcon size={28} />
            </LinkButton>
          }




        </div>
      </nav>

      <main className="relative col-start-2 lg:mt-0 mt-[13.5rem] lg:col-start-4 col-end-12 z-10">

        <section className="lg:hidden text-white flex flex-row justify-start items-center gap-4">
          <label>Generate: </label>
          <Select onValueChange={(e) => setItem(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="What to generate?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem disabled={!url || !(user.totalProduct >= 5)} value="description">{locale.app.description}</SelectItem>
              <SelectItem disabled={!url || !(user.totalProduct >= 5)} value="email">{locale.app.email_marketing}</SelectItem>
              <SelectItem disabled={!url || !(user.totalProduct >= 5)} value="marketing_angles">{locale.app.marketing_angle}</SelectItem>
              <SelectItem disabled={!url || !(user.totalProduct > 15)} value="title">{locale.app.product_title}</SelectItem>
              <SelectItem disabled={!url || !(user.totalProduct >= 5)} value="faqs">{locale.app.faqs}</SelectItem>
              <SelectItem disabled={!url || !(user.totalProduct >= 5)} value="reviews">{locale.app.reviews}</SelectItem>
              <SelectItem disabled={!url || !(user.totalProduct > 15)} value="after_sale">{locale.app.after_sale}</SelectItem>
              <SelectItem disabled={!url || !(user.totalProduct > 15)} value="successful">{locale.app.successfull_rate}</SelectItem>
              <SelectItem disabled={!url || !(user.totalProduct >= 15)} value="influencer">{locale.app.influencer_breif}</SelectItem>
            </SelectContent>
          </Select>

        </section>


        <section className="p-5  ">
          <ButtonSection
            data={data}
            item={item}
            description={description}
            locale={locale}
            handleGetByURL={handleGetByURL}
            loading={loading}
            title={title} />

          <section>
            <DynamicRenderer
              data={data}
              item={item}
              loading={loading}
              placeholderImageSrc="/robot.png"
              LoadingComponent={LoadingBar}
              ImageGeneratorComponent={ImageGenrateBox}
            />
          </section>
        </section>
      </main>
    </MainLayout>
  );
}
export default App;