import { Card, CardHeader, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select"
import useItem from "@/zutstand/store/item"
import { useEffect } from "react"
import useStore from "@/zutstand/store/store"
import useUser from "@/zutstand/store/user"
import { Progress } from "../ui/progress"
import useLocale from "@/zutstand/store/locale"



export default function AddProduct() {
    const { url } = useStore()
    const { setItem, item } = useItem()
    const { images, setImage, image, setImages,setTitle } = useStore()
    const { user } = useUser()
    const {locale} = useLocale()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://server-delicate-glade-3069.fly.dev/products/get-product-image", {
                    method: "GET",
                    headers: { "authorization": String(window.localStorage.getItem("token")) }
                })

                if (res.ok) {
                    const { images: data } = await res.json()
                    //    setListData(data)
                    setImages(data)
                    console.log("Image Data -->", data)
                }

            } catch (error) {
                console.log("Error -- ", error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        if (image.img) {
            setImage({ prompt: '', size: '', img: '' })
        }
    }, [url])

    const shouldRender = !window.location.pathname.includes('/setting');

    return shouldRender && <Card className="absolute z-0 scale-90 -translate-y-5 lg:fixed right-5 text-center
     top-80 lg:top-[400px] text-white w-[90vw] md:w-auto md:min-w-[230px]">

        <CardHeader>
            <h3 className="text-xl font-bold text-white">Images</h3>
            <div className="flex flex-col justify-start gap-2">
                <div className="lg:hidden flex flex-col">
                    <label>{locale.addproductwidget.products}: {user.regenerations}/100</label>
                </div>
            </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">

            <Button onClick={() => setItem("images")} className="w-full" size={"lg"}>{locale.image.coa}+</Button>
            <Select /* disabled={item != 'images'} */ onValueChange={(e) => {
                setImage(images[Number(e)]) 
                setTitle(images[Number(e)].name!)
                setItem("images")
            }} >
                <SelectTrigger  className={ item == 'images'  ? "w-[180px] flex flex-row justify-center gap-1 border-none bg-white text-[#0f172a]" : "w-[180px] border-none flex flex-row justify-center gap-1 bg-[#0f172a]"} >
                    <SelectValue   placeholder={locale.image.select} />
                </SelectTrigger>
                <SelectContent>
                    {
                        images.map((e, i) => <SelectItem value={String(i)}>{e.name}</SelectItem>)
                    }
                </SelectContent>
            </Select>


            <div className="hidden lg:flex flex-col my-4 gap-2">
                <label>{locale.addproductwidget.products}: {user.regenerations}/{user.totalRegenerations}</label>
                <Progress value={user.regenerations} max={user.totalRegenerations} />
            </div>


        </CardContent>



    </Card>
}