import MainLayout from "@/layouts/Main";
import { useParams } from "react-router-dom";
import { useProduct } from "@/services/queries";
import { Button } from "@/components/ui/button";
import useLocale from "@/zutstand/store/locale";

export default function Product() {

    const { id } = useParams();
    const { locale } = useLocale()
    const product = useProduct(id!);

    if (product.isPending) {
        return (
            <MainLayout>
                <main className="col-span-12 text-white">
                    Loading...
                </main>
            </MainLayout>
        );
    }

    if (product.isError) {
        return (
            <MainLayout>
                <main className="col-span-12 text-white">
                    Error...
                </main>
            </MainLayout>
        );
    }

    const { productTitle, productDescription, marketing_angles, url, email, influencer, successful, after_sale, faqs, reviews, description, overview, title } = product.data.data;

    return (
        <MainLayout>
            <main className="col-start-1 p-4 text-white col-end-12 mt-48 lg:mt-0">
                {/* Product Title */}
                <section>
                    <h1 className="text-2xl font-bold">{productTitle}</h1>
                    <p>{productDescription}</p>
                </section>


                <section className="max-h-[60vh] overflow-y-scroll">


                    {/* Titles  */}
                    <section>
                        {title.length > 0 && (
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold mb-2">{locale.app.product_title}</h2>
                                {title.map((angle: string, index: number) => (
                                    <div key={index} className="mb-4">
                                        <div dangerouslySetInnerHTML={{ __html: angle }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* description  */}
                    <section>
                        {description.length > 0 && (
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold mb-2">{locale.app.description}</h2>
                                {description.map((angle: string, index: number) => (
                                    <div key={index} className="mb-4">
                                        <div dangerouslySetInnerHTML={{ __html: angle }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* overview  */}
                    <section>
                        {description.length > 0 && (
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold mb-2">{locale.app.description}</h2>
                                {overview.map((angle: string, index: number) => (
                                    <div key={index} className="mb-4">
                                        <div dangerouslySetInnerHTML={{ __html: angle }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>



                    {/* influencer  */}
                    <section>
                        {influencer.length > 0 && (
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold mb-2">{locale.app.influencer_breif}</h2>
                                {email.map((angle: string, index: number) => (
                                    <div key={index} className="mb-4">
                                        <div dangerouslySetInnerHTML={{ __html: angle }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>


                    {/* Successful  */}
                    <section>
                        {successful.length > 0 && (
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold mb-2">{locale.app.successfull_rate}</h2>
                                {successful.map((angle: string, index: number) => (
                                    <div key={index} className="mb-4">
                                        <div dangerouslySetInnerHTML={{ __html: angle }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* FAQs  */}
                    <section>
                        {faqs.length > 0 && (
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold mb-2">{locale.app.faqs}</h2>
                                {faqs.map((angle: string, index: number) => (
                                    <div key={index} className="mb-4">
                                        <div dangerouslySetInnerHTML={{ __html: angle }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>



                    {/* Reviews  */}
                    <section>
                        {reviews.length > 0 && (
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold mb-2">{locale.app.reviews}</h2>
                                {reviews.map((angle: string, index: number) => (
                                    <div key={index} className="mb-4">
                                        <div dangerouslySetInnerHTML={{ __html: angle }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>


                    {/* After Sale  */}
                    <section>
                        {after_sale.length > 0 && (
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold mb-2">{locale.app.after_sale}</h2>
                                {after_sale.map((angle: string, index: number) => (
                                    <div key={index} className="mb-4">
                                        <div dangerouslySetInnerHTML={{ __html: angle }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>


                    {/* email  */}
                    <section>
                        {email.length > 0 && (
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold mb-2">{locale.app.email_marketing}</h2>
                                {email.map((angle: string, index: number) => (
                                    <div key={index} className="mb-4">
                                        <div dangerouslySetInnerHTML={{ __html: angle }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Marketing Angles */}
                    <section>
                        {marketing_angles.length > 0 && (
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold mb-2">{locale.app.marketing_angle}</h2>
                                {marketing_angles.map((angle: string, index: number) => (
                                    <div key={index} className="mb-4">
                                        <div dangerouslySetInnerHTML={{ __html: angle }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>


                </section>

                {/* URL Section */}
                <section className="mt-6">
                    <Button>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=""
                        >
                            {locale.product.coa}
                        </a>
                    </Button>
                </section>
            </main>
        </MainLayout>
    );
}
