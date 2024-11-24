

type Props = {
    children: string | JSX.Element | JSX.Element[],
    classname?: string
}


export default function AuthLayout({ children, classname }: Props) {
    return <>

        <main className="flex dark lg:flex-row flex-col h-screen w-screen">

            <section className={"flex-1 flex flex-row justify-center items-center w-full dark:bg-white bg-black " + classname}>
                <div className='max-w-md'>
                    {children}
                </div>
            </section>

        </main>

    </>
}