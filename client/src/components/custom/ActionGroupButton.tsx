import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import useStore from "@/zutstand/store/store";
import useItem from '@/zutstand/store/item'
import useLocale from "@/zutstand/store/locale";
interface ButtonSectionProps {
    item: string; // The item string used for conditional rendering
    data: Record<string, any>; // The data object containing arrays or values
    title?: string; // Optional title to display
    description?: string; // Optional description to display
    loading?: boolean; // Loading state
    locale: { app: { regenrate: string } }; // Locale object for translation
    handleGetByURL: (force: boolean) => void; // Function to handle URL actions
}

const ButtonSection: React.FC<ButtonSectionProps> = ({
    item,
    data,
    title,
    description,
    loading = false,
    locale,
    handleGetByURL,
}) => {
    const { image, setImage } = useStore()
    const { setItem } = useItem()
    const ref = useRef<HTMLDivElement>(null);
    const { locale: l } = useLocale()
    const handleDownload = async () => {
        const fileUrl = image.img;

        try {
            // Fetch the file as a blob
            const response = await fetch(fileUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch the file");
            }
            const blob = await response.blob();

            // Create a temporary URL and trigger download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = 'image.png'; // Set desired file name
            document.body.appendChild(a);
            a.click();

            // Clean up the temporary URL
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    const checkIfEmpty = (data: Record<string, any>): boolean => {
        for (let key in data) {
            if (data[key]?.length === 0) {
                return false; // Return false if any array is empty
            }
        }
        return true; // Return true if all arrays are non-empty
    };

    return (
        <div className="flex flex-col md:flex-row mb-2 justify-between gap-4">
            {/* Text Content */}
            <div className="text-white flex flex-col gap-4">
                <p className="text-2xl md:text-4xl font-light">{data[item] && title}</p>
                <p className={`text-sm md:text-md font-light ${item ? "hidden" : "block"}`}>
                    {data[item] && description}
                </p>
            </div>

            {/* Buttons Section */}
            <div className="flex flex-row justify-between lg:gap-4">
                {/* Copy Button */}
                {item || (checkIfEmpty(data) || loading) ? item === 'images' ? (<Button
                    className="px-4 py-2  text-white rounded-lg"
                    onClick={handleDownload}
                >
                    {l.actionButton.download}
                </Button>) : (
                    <Button
                        className="px-4 py-2  text-white rounded-lg"
                        onClick={() => {
                            navigator.clipboard.writeText(ref.current?.innerText || "");
                        }}
                    >
                        {l.actionButton.copy}
                    </Button>
                ) : null}


                {
                    item || (checkIfEmpty(data) || loading) ? (<Button
                        className="px-4 py-2  text-white rounded-lg"
                        onClick={() => item === 'images' ? setImage({ prompt: '', img: '', size: '' }) : setItem("")}
                    >
                        {l.actionButton.reset}

                    </Button>) : null
                }



                {/* Regenerate Button */}
                {item || (checkIfEmpty(data) || loading) ? item === 'images' ? ("") : (
                    <Button
                        className="px-4 py-2  text-white rounded-lg "
                        onClick={() => handleGetByURL(true)}
                    >
                        {locale.app.regenrate}
                    </Button>
                ) : null}






            </div>
        </div >
    );
};

export default ButtonSection;
