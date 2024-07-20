"use client"
import React from 'react'
import Image from "next/image"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Link from 'next/link'

const Hero = () => {
    useGSAP(() => {
        gsap.to("#heading", {
            opacity: 1,
            ease: 'bounce.inOut',
            stagger: 0.4,
        })
    }, [])


    return (
        <section className="overflow-hidden bg-slate-950 flex items-center flex-col">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
                <div className="mx-auto max-w-xl text-center">
                    <h1 id="heading" className="font-extrabold opacity-0 text-white text-2xl md:text-4xl">
                        Manage Your Expenses
                        <br />
                        <strong className="font-extrabold text-primary sm:block mt-4"> Take Control of Your Finances</strong>
                    </h1>

                    <p id="heading" className="mt-4 opacity-0 text-md text-slate-600 font-semibold">
                        Easily track your spending, set budgets, and gain insights into your financial habits. Stay on top of your finances with our intuitive and powerful expense tracker app.
                    </p>

                    <div id="heading" className="mt-8 flex flex-wrap opacity-0 justify-center gap-4">
                        <Link
                            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-700 sm:w-auto"
                            href={"/sign-up"}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
            <div id="heading" className="-mt-14 opacity-0 md:p-0 p-4">
                <Image
                    src='/dashboardimg.jpg'
                    alt="dashboard image"
                    width={1000}
                    height={700}
                    className="rounded-xl"
                />
            </div>
            <br /><br />
        </section>
    )
}

export default Hero
