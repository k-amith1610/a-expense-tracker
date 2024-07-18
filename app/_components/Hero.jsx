import React from 'react'
import Image from "next/image"

const Hero = () => {
    return (
        <section className="bg-gray-50 flex items-center flex-col">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="font-extrabold text-2xl md:text-4xl">
                        Manage Your Expenses
                        <br />
                        <strong className="font-extrabold text-primary sm:block mt-4"> Take Control of Your Finances</strong>
                    </h1>

                    <p className="mt-4  text-md text-gray-400">
                        Easily track your spending, set budgets, and gain insights into your financial habits. Stay on top of your finances with our intuitive and powerful expense tracker app.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
                            href="#"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
            <Image 
                src='/dashboardimg.jpg'
                alt="dashboard image"
                width={1000}
                height={700}
                className="mt-5 rounded-xl border-2"
            />
            <br /><br />
        </section>
    )
}

export default Hero
