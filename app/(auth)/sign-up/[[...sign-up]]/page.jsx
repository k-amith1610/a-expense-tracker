"use client"

import { SignUp } from "@clerk/nextjs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect } from "react";


export default function Page() {

    useGSAP(() => {
        gsap.to("#head", {
            opacity: 1,
        })
        gsap.to("#logo", {
            y: -20,
            yoyo: true,
            opacity: 1,
            repeat: -1,
            duration: 1,

        })
    }, [])

    useEffect(() => {
        const audio = new Audio("/bgmusic.mp3");
        // audio.volume = 0.5;
        audio.loop = true;
        audio.play();

        return () => {
            audio.pause();
            audio.currentTime = 0;
        }
    })

    return (
        <section className="bg-gray-900 dark:bg-gray-900">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="/authbg.jpg"
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                    />

                    <div id="head" className="hidden lg:relative opacity-0 lg:block lg:p-12">
                        <a id="logo" className="block opacity-40 text-white" href="/">
                            <span className="sr-only">Home</span>
                            <Image src={'/etlogo1.png'}
                                alt='logo'
                                width={140}
                                height={100}
                                className='rounded-t-md bg-blue-400'
                            />

                        </a>

                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Welcome to A - Expense Tracker
                        </h2>

                        <p className="mt-4 leading-relaxed text-white/90">
                            Easily track your spending, set budgets, and gain insights into your financial habits. Stay on top of your finances with our intuitive and powerful expense tracker app.
                        </p>
                    </div>
                </section>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <div id="head" className="relative opacity-0 -mt-16 block lg:hidden">
                            <a
                                id="logo"
                                className="inline-flex opacity-40 mt-3 items-center justify-center"
                                href="#"
                            >
                                <Image src={'/etlogo1.png'}
                                    alt='logo'
                                    width={140}
                                    height={100}
                                    className='rounded-t-md bg-blue-400'
                                />
                            </a>

                            <h1 className="mt-4 text-2xl font-bold text-white">
                                Welcome to A - Expense Tracker
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                                Easily track your spending, set budgets, and gain insights into your financial habits. Stay on top of your finances with our intuitive and powerful expense tracker app.
                            </p>
                        </div>
                        <div className="md:mt-0 mt-10" >
                            <SignUp />
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
}