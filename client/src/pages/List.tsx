import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/Main";
import useLocale from "@/zutstand/store/locale";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



export default function List() {
    const [listData, setData] = useState([])
    const { locale } = useLocale()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:4000/products/get-products", {
                    method: "GET",
                    headers: { "authorization": String(window.localStorage.getItem("token")) }
                })

                if (res.ok) {
                    const { data } = await res.json()
                    setData(data)
                    console.log("USER ", data)
                }

            } catch (error) {
                console.log("Error -- ", error)
            }
        }

        fetchData()
    }, [])
    return <MainLayout>
        <main className="col-span-12 p-4 lg:mt-0 mt-36">

            <section className="flex flex-row my-4 justify-center lg:justify-start gap-3 items-start  flex-wrap">
                {
                    listData && listData.length == 0 ? <p className="text-white">{locale.list.noProducts}</p> : listData && listData.filter((e : {productDescription:string,productTitle:string, _id : string} ) => e.productDescription && e.productTitle).map((e : {productDescription:string,productTitle:string, _id : string} ) => <Link to={'/product/' + e._id} className=" w-full lg:w-1/4">
                        <Card className="bg-[#0a081e] text-white p-5">
                            <CardContent className="flex flex-col gap-4">
                                <h3 className="font-bold">{e.productTitle}</h3>
                                <p>{e.productDescription}</p>
                                <Button>{locale.list.seemore}</Button>
                            </CardContent>
                        </Card>
                    </Link>)
                }


            </section>


        </main>
    </MainLayout>
}