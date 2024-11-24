import Cheerio from "cheerio"
import OpenAI from "openai";
import axios from "axios";
import showdown from "showdown";

import ProductModel from "../../../db/models/products.model.js"
import UserModel from "../../../db/models/user.model.js"


// Generate the product detail after getting the information from the url provided
const scrapperController = async (req, res) => {
    let apiKey = process.env.OPENAI_APIKEY;
    let scraperAPIKEY = "76f30ef0eb9a12579cf4ff46fd900a86";
    const openai = new OpenAI({ apiKey: apiKey });

    try {

        let { url, language, item, regen, title: productTitle, description: productDescriptiom } = req.body;
        if (!url) {
            throw new Error("Url Doesn't Exist!")
        }
        console.log(language)
        let user = await UserModel.findById(req.user.id).exec()
        let product = await ProductModel.findOne({ user: req.user.id, url: url });
        console.log(regen)

        if (product && !regen  && !product[item].length == 0) {
            return res.status(200).json(product);
        }

        let result = {};
        let isAmazonUrl = url.includes("amazon");

        if (isAmazonUrl) {
            const asin = url.split("dp/")[1]?.split("/")[0];
            if (!asin) throw new Error("Invalid ASIN extraction from URL");

            const response = await fetch(`https://api.scraperapi.com/structured/amazon/product?api_key=${scraperAPIKEY}&asin=${asin}`);
            result = await response.json();
            result = {
                content: Object.keys(result).map(key => `${key}: ${result[key]}`).join(', '),
                title: asin,
                url
            };
        } else {
            const response = await fetch(url);
            result = await response.text();
            const $ = Cheerio.load(result);
            $('script, style, head, meta').remove();
            $('*').each((index, element) => {
                $(element).removeAttr(Object.keys(element.attribs));
            });
            const cleanedHTML = $.html();

            result = { content: cleanedHTML, title: $("h1").text(), url };
        }

        const data = {
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
            images: [],
            productTitle: productTitle,
            productDescription: productDescriptiom

        };

        if (item) {
            // Generate content if item is provided
            const converter = new showdown.Converter();
            if (item == 'title') {
                item = 'Legal Polices'
                console.log(item)
            }

            if (item == 'images') {
                let completion;
                try {
                 /*    completion = await openai.chat.completions.create({
                        messages: [
                            { role: "system", content: `Give prompt to generate an fake image of the product with  description.` },
                            { role: "user", content: result.content }
                        ],
                        model: "gpt-4o-mini",
                    }); */

                    const { data, status } = await axios.post(
                        `https://api.astria.ai/tunes/1380781/prompts`,
                        {
                            text: `"sks dummy Easy One Touch 2 Wireless air vent and CD slot mount is a versatile and convenient solution for charging and mounting your smartphone in your vehicle. This mount features Qi wireless charging technology, allowing you to charge your compatible devices without the need for additional cables. With the patented Easy One Touch mechanism, you can securely mount your phone with just one hand. The mount is adjustable and can accommodate smartphones of various sizes. Choose between mounting options for your vehicle's air vent or CD slot. Experience a safer and more convenient driving experience with the iOttie Easy One Touch 2 Wireless mount."`,
                            seed: Math.random() * 100000,
                            inpaint_faces: true,
                            callback: `${process.env.SERVER_URL}/api/generate/save_callback`,
                            ar: "1:1",
                            num_images: 1,
                            super_resolution: true,
                            face_correct: true,
                            hires_fix: true,
                            film_grain: true,
                            negativePrompt: 'no person'
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${process.env.ASTRIA_API_KEY}`,
                            },
                        }
                    )

                    console.log(data)

                } catch (err) {
                    throw new Error("Error generating content with OpenAI: " + err.message);
                }

                const htmlContent = converter.makeHtml(completion.choices[0].message.content);
                data[item] = [htmlContent];
            } else {
                let completion;
                try {
                    completion = await openai.chat.completions.create({
                        messages: [
                            { role: "system", content: `Make sure to Generate the result for following pormpt in ${language} \n. Generate fake product ${item} details for the provided content. Create 3-4 different variants, each with at least 200 words unless generating a title.` },
                            { role: "user", content: result.content }
                        ],
                        model: "gpt-4o-mini",
                    });
                } catch (err) {
                    throw new Error("Error generating content with OpenAI: " + err.message);
                }

                const htmlContent = converter.makeHtml(completion.choices[0].message.content);
                data[item] = [htmlContent];
            }


        }

        user.regenerations += 1
        await user.save()



        if (!product) {
            // Create a new product if it doesn't exist
            product = await ProductModel.create({ ...data, user: req.user.id, url: url });
            user.product += 1
            await user.save()
            return res.status(201).json(product);
        }
        console.log(user)
        // Merge new data with existing data
        const updatedData = {
            ...product.toObject(),
            [item]: item ? [...(product[item] || []), ...(data[item] || [])] : (product[item] || [])
        };

        // Update the product
        product = await ProductModel.findOneAndUpdate({ user: req.user.id, url: url }, updatedData, { new: false }).exec();
        return res.status(200).json(product);

    } catch (error) {
        console.error("Error Message: ", error.message);
        console.error("Error: ", error);

        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};



// Generate the product detail from the information
const userInfoProductGeneratorController = async (req, res) => {
    let apiKey = process.env.OPENAI_APIKEY
    const openai = new OpenAI({ apiKey: apiKey });
    try {
        let { content: info, service } = req.body

        if (!service) {
            service = "Need to genrate product details similar to what we are giving you"
        }

        if (!info || info.length <= 250)
            return res.status(403).json({ msg: "Please Provide Proper Information to generate Product on!" })


        const completion = await openai.chat.completions.create({
            messages: [{ "role": "system", "content": service },
            { "role": "user", "content": info }],
            model: "gpt-4o-mini",
        });
        let detail_generated = completion.choices[0].message.content
        let result = { content: info }
        res.status(200).json({ detail_generated, result })
    } catch (error) {
        console.log("Error : ", error.message)
        res.status(500).json({ msg: error.message })
    }
}

// Generate User Product Image
const generateProductImageModel = async (req, res) => {
    const { prompt, approvedImages } = req.body;
    console.log("er")

    try {
        const aiData = await axios.post(
            "https://api.astria.ai/tunes",
            {
                tune: {
                    title: prompt.title
                        ? prompt.title
                        : String("a" + Math.random() * 1000000),
                    name: prompt.name
                        ? prompt.name
                        : String("a" + Math.random() * 1000000),
                    branch: prompt.branch,
                    image_urls: approvedImages,
                },
            },
            {
                maxBodyLength: Infinity,
                headers: {
                    Authorization: `Bearer ${process.env.ASTRIA_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );
        res.status(200).json(aiData.data);
    } catch (error) {
        console.log("### Error#Create-Tune --- \t", error.message);
        return res.status(500).json({ msg: error.message });
    }
}

const generateProdutImage = async (req, res) => {
    const { prompt, negativePrompt } = req.body;
    const { id } = req.params;
    try {


        const { data, status } = await axios.post(
            `https://api.astria.ai/tunes/${id}/prompts`,
            {
                text: `${prompt.text}`,
                seed: Math.random() * 100000,
                inpaint_faces: true,
                callback: `${process.env.SERVER_URL}/api/generate/save_callback`,
                ar: "1:1",
                num_images: prompt.range <= 8 ? prompt.range : 1,
                super_resolution: true,
                face_correct: true,
                hires_fix: true,
                film_grain: true,
                negativePrompt: negativePrompt
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.ASTRIA_API_KEY}`,
                },
            }
        );

        res.status(200).json(data);
    } catch (error) {

        console.log(error.response);
        res.status(500).json({ msg: error.message });

    }




}


const getProdutImage = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, status } = await axios.get(
            `https://api.astria.ai/tunes/${id}/prompts`,

            {
                headers: {
                    Authorization: `Bearer ${process.env.ASTRIA_API_KEY}`,
                },
            }
        );

        res.status(200).json(data);
    } catch (error) {

        console.log(error.response);
        res.status(500).json({ msg: error.message });

    }

}

const getImageGeneratorModel = async (req, res) => {
    const { id } = req.params;
    try {
        const { data } = await axios.get(`https://api.astria.ai/tunes/${id}`, {
            headers: {
                Authorization: `Bearer ${process.env.ASTRIA_API_KEY}`,
            },
        });


        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: error.message });
    }
}


const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({ user: req.user.id }).exec()

        return res.status(200).json({ message: "Products!", data: products })
    } catch (error) {
        return res.status(500).json({ msg: error.message });

    }
}


const getProduct = async (req, res) => {
    try {
        const { id } = req.query
        const product = await ProductModel.findById(id).exec()

        return res.status(200).json({ message: "Product!", data: product })
    } catch (error) {
        return res.status(500).json({ msg: error.message });

    }
}

export {
    scrapperController,
    userInfoProductGeneratorController,
    generateProductImageModel,
    generateProdutImage,
    getImageGeneratorModel,
    getProdutImage,
    getProducts,
    getProduct
}