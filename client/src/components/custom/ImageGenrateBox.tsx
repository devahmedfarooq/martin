import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Input } from "../ui/input"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"
import { useImageGenrate } from "@/services/queries"
import LoadingBar from "./LoadingBar"
import useStore from "@/zutstand/store/store"
import useLocale from "@/zutstand/store/locale"

export default function ImageGenrateBox() {
    const { image: i, setImage: setI } = useStore()
    const [image, setImage] = useState(i.img)
    const [prompt, setPrompt] = useState(i.prompt)
    const [size, setSize] = useState(i.size)
    const [name, setName] = useState(i.name)
    const { locale } = useLocale()
    const mutation = useImageGenrate()

    const handleFileUpload = async (e:any) => {

        function convertBlobToBase64(blob:Blob) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(blob);
            });
        }
        const file = await fetch(URL.createObjectURL(e.target.files[0])).then((res) => res.blob());
        const base64Data = await convertBlobToBase64(file);
        if(base64Data) {
            setImage(String(base64Data))
        }
    }

    const handleFileGenrate = () => {
        mutation.mutate({ img: image, prompt, size: size, name: name! })
    }


    useEffect(() => {
        if (mutation.isSuccess) {
            setPrompt("")
            //    setImage("")
        }
    }, [mutation, mutation.isSuccess])


    useEffect(() => {
        setImage(i.img)
        setPrompt(i.prompt)
        setSize(i.size)
        setName(i.name)
    }, [i])

    useEffect(() => {
        if (mutation.data && mutation.data.img) {
            setI({
                ...i,
                img: mutation.data.img
            })
        }
    }, [mutation.data])



    return <Card className="flex  text-white flex-col z-10 relative">
        <CardContent className="flex flex-col gap-4 p-4">
            <div>
                <Input placeholder="Enter Name Of Image Product" value={name} onChange={(e) => setName(e.target.value)} />
            </div>


            <div className="flex  justify-between items-center flex-col gap-4 lg:flex-row">
                <div className="">
                    <label >Size</label>
                    <Select onValueChange={(e) => setSize(e)} defaultValue="1024x1024">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a size" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Size</SelectLabel>
                                <SelectItem value="1024x1024">1024x1024</SelectItem>
                                <SelectItem value="1024x1792">1024x1792</SelectItem>
                                <SelectItem value="1792x1024">1792x1024</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="">
                    <Button disabled={!image || !name || !size || !prompt} onClick={handleFileGenrate} className="" >{locale.image.generate}</Button>
                </div>
                <div>
                    <label>File</label>
                    <Input onChange={handleFileUpload} type="file" />
                </div>
            </div>

            <div className="flex gap-4 justify-between flex-row">
                <Textarea placeholder="Enter Prompt Of Image Product" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            </div>



            <div>
                {
                    !mutation.isSuccess && !mutation.isPending && image && i.img &&
                    <Card className="p-4"> <img src={image} /> </Card>
                }

                {
                    mutation.isSuccess && i.img && <Card className="p-4"><img src={i.img} /></Card>
                }

                {
                    mutation.isPending && <LoadingBar />
                }



            </div>
        </CardContent>
        {
            mutation.isError && <CardFooter><p>Error : Some error genrating image.</p></CardFooter>
        }
    </Card>
}