import { Card, CardHeader, CardContent } from "../ui/card"
import { Dialog, DialogTrigger, DialogClose, DialogContent } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select"
import { Progress } from "../ui/progress"
import useStore from "@/zutstand/store/store"
import useUser from "@/zutstand/store/user"
import useProductData from "@/zutstand/store/data"
import useItem from "@/zutstand/store/item"
import { useNavigate } from "react-router-dom"
import useLocale from "@/zutstand/store/locale"
import { useEffect, useState } from "react"



export default function AddProduct() {
    const [listData, setListData] = useState([])
    const { title, description, url, language, setLanguage, setUrl, setDescription, setTitle } = useStore()
    const { user } = useUser()
    const { locale } = useLocale()
    const { setData } = useProductData()
    const { setItem, item } = useItem()


    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:4000/products/get-products", {
                    method: "GET",
                    headers: { "authorization": String(window.localStorage.getItem("token")) }
                })

                if (res.ok) {
                    const { data } = await res.json()
                    setListData(data)
                    //  const { } = data
                    //    setImages(data)
                    console.log("Images ", data)
                }

            } catch (error) {
                console.log("Error -- ", error)
            }
        }

        fetchData()
    }, [])

    const shouldRender = !window.location.pathname.includes('/setting');

    return shouldRender && <Card className="scale-90 -translate-y-1 absolute z-0 lg:fixed right-5 text-center
     top-24 lg:top-28  text-white w-[90vw] md:w-auto">
        <CardHeader className="flex py-2 flex-row justify-between items-center">
            {/*             <h1 className="text-2xl md:text-3xl font-black">{locale.addproductwidget.title}</h1>
 */}            <div className="flex flex-col justify-start gap-2">
                <div className="lg:hidden flex flex-col">
                    <label>{locale.addproductwidget.products}: {user.product}/100</label>
                </div>
                {/*                 <div className="lg:hidden flex flex-col  gap-2">
                    <label>Generations: {user.regenerations}/200</label>
                </div> */}
            </div>
        </CardHeader>

        <CardContent>

            <h3 className="text-xl font-bold text-white my-3">Text</h3>
            <Dialog >
                <DialogTrigger className="flex w-full flex-row justify-around">

                    <Button className="w-full" size={"lg"}>{locale.addproductwidget.coa} +</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw]  bg-[#0f172a] lg:max-w-[600px]">


                    <div className="flex gap-4 flex-col items-center">
                        <div className="flex lg:w-96 flex-col gap-4">
                            <label className="text-lg text-center md:text-2xl font-bold text-white">
                                {locale.addproductwidget.popup.name}
                            </label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="max-w-full md:max-w-sm text-white"
                            />
                        </div>

                        <div className="flex lg:w-96 flex-col gap-4">
                            <label className="text-lg text-center md:text-2xl font-bold text-white">
                                {locale.addproductwidget.popup.description}
                            </label>
                            <Input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="max-w-full text-white md:max-w-sm"
                            />
                        </div>

                        <div className="flex lg:w-96 flex-col gap-4">
                            <label className="text-lg text-center md:text-2xl font-bold text-white">
                                {locale.addproductwidget.popup.amazonPage}
                            </label>
                            <Input
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="max-w-full text-white md:max-w-sm"
                            />
                        </div>

                        <div className="flex lg:w-96 flex-col gap-4">
                            <label className="text-lg text-center md:text-2xl font-bold text-white">
                                {locale.addproductwidget.popup.language}
                            </label>
                            <Select value={language} onValueChange={setLanguage}>
                                <SelectTrigger className="w-full text-white ">
                                    <SelectValue placeholder="English" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="English">English</SelectItem>
                                    <SelectItem value="French">French</SelectItem>
                                    <SelectItem value="Polish">Polish</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <DialogClose>
                            <Button className="bg-white text-black hover:bg-slate-200" onClick={() => {
                                setData({
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
                                })
                                setItem("")
                                navigate('/')
                            }}>{locale.addproductwidget.popup.generate}</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>


            <Select onValueChange={(e) => {
                setUrl(e.url)
                setDescription(e.productTitle)
                setTitle(e.productTitle)
                setItem("")
                // setImages(e.images)
                navigate('/')
            }}>
                <SelectTrigger className={item !== 'images' && url ? "w-[180px] border-none flex flex-row justify-center gap-1  mt-4 lg:my-4 bg-white text-[#0f172a]" : "w-[180px] border-none flex flex-row justify-center gap-1  mt-4 lg:my-4 bg-[#0f172a]"}>
                    <SelectValue placeholder={locale.addproductwidget.select} />
                </SelectTrigger>
                <SelectContent>
                    {
                        listData.map((item:any) => <SelectItem value={item}>{item.productTitle}</SelectItem>
                        )
                    }
                </SelectContent>
            </Select>


            <div className="hidden lg:flex flex-col my-4 gap-2">
                <label>{locale.addproductwidget.products}: {user.product}/{user.totalProduct}</label>
                <Progress value={user.product} max={user.totalProduct} />
            </div>

            {/*   <div className="hidden lg:flex flex-col my-4 gap-2">
                <label>{locale.addproductwidget.generation}: {user.regenerations}/200</label>
                <Progress value={user.regenerations} max={200} />
            </div> */}
        </CardContent>
    </Card>
}