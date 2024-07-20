"use client"
import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideNav = () => {

    const navList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard',
        },
        {
            id: 2,
            name: 'Budget',
            icon: PiggyBank,
            path: '/dashboard/budget',
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/expenses',
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade',
        }
    ]

    const path = usePathname();
    // console.log('Current path:', path);

    return (
        <div className="h-screen p-5 border shadow-sm">
            <Image
                src={'/etlogo1.png'}
                alt='logo'
                width={160}
                height={100}
                className='rounded-t-md bg-blue-400'
            />

            <div className="mt-5">
                {navList.map((nav) => (
                    <Link href={nav.path}>
                        <h2
                            key={nav.id}
                            className={`flex gap-2 items-center text-gray-500
                                    font-medium p-4 cursor-pointer rounded-md mb-2
                                    hover:text-primary hover:bg-blue-100
                                    ${path === nav.path ? 'text-primary bg-blue-100' : ''}
                                    `}
                        >
                            <nav.icon />
                            {nav.name}
                        </h2>
                    </Link>
                ))}
            </div>
            <div className="fixed bottom-10 p-3 flex gap-2 items-center">
                <UserButton />
                <span className="text-gray-500 font-semibold">Profile</span>
            </div>
        </div>
    )
}

export default SideNav
