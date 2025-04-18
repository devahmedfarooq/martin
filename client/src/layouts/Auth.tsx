

type Props = {
    children: string | JSX.Element | JSX.Element[],
    classname?: string
}


export default function AuthLayout({ children, classname }: Props) {





        return <main className="lg:flex lg:overflow-hidden lg:max-h-[100vh] relative min-h-[100vh] flex-col-reverse lg:flex-row justify-between ">

            <section className=" hidden lg:block relative  bg-[#020013] lg:rounded-none rounded-t-[100%] flex-1">
                <img src="/robot.png" className=" w-full min-w-[858px] absolute top-[20%] -left-[10%] " />
            </section>




            <section className="flex relative  flex-1 w-screen lg:w-full">
                    {children}
            </section>

            <section className="mt-16 relative overflow-y-hidden md:hidden w-screen h-[300px] bg-[#020013] lg:rounded-none rounded-t-[300%] flex-1">
                <img src="/robot.png" className=" lg:w-full w-full min-w-16 lg:min-w-[858px] absolute lg:top-[10%] top-[10vh] -left-[5%] lg:-left-[10%] " />
            </section>
        </main>

    


/*     return <>

        <main className="flex dark lg:flex-row flex-col h-screen w-screen">

            <section className={"flex-1 flex flex-row justify-center items-center w-full dark:bg-white bg-black " + classname}>
                <div className='max-w-md'>
                    {children}
                </div>
            </section>

        </main>

    </> */
}