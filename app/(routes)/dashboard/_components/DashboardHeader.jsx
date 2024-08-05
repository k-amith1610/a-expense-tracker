"use client"
import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";

const DashboardHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Budgets',
      icon: PiggyBank,
      path: '/dashboard/budget',
    },
    {
      id: 3,
      name: 'Expenses',
      icon: ReceiptText,
      path: '/dashboard/expenses',
    }
  ];

  const path = usePathname();

  return (
    <div className="fixed w-full z-10 top-0 md:relative p-4 shadow-sm border-b flex items-center justify-between text-white bg-slate-950">
      <div className="md:hidden cursor-pointer">
        {isNavOpen ?
          <AiOutlineCloseCircle onClick={() => setIsNavOpen(!isNavOpen)} className="text-2xl" /> :
          <AiOutlineMenu onClick={() => setIsNavOpen(!isNavOpen)} className="text-2xl" />
        }
      </div>
      {isNavOpen && (
        <div className="absolute top-[75px] left-5 w-[45%] bg-black rounded-lg flex flex-col items-center z-10 p-3 ">
          {navList.map((nav) => (
            <Link href={nav.path} key={nav.id} onClick={() => setIsNavOpen(!isNavOpen)}>
              <h2
                className={`flex gap-1 items-center text-gray-500
                            font-medium p-3 cursor-pointer rounded-md mb-2
                            hover:text-primary hover:bg-blue-100
                            ${path === nav.path ? 'text-primary bg-blue-100' : ''}
                            `}
              >
                <nav.icon className="mr-2" />
                <span className="flex-grow">{nav.name}</span>
              </h2>
            </Link>
          ))}
        </div>
      )}
      <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center animate-pulse">
        <Image
          src={'/etlogo1.png'}
          alt='logo'
          width={120}
          height={80}
          className='rounded-t-md bg-blue-400'
        />
      </div>

      <div className="hidden md:block md:invisible">
        <AiOutlineMenu />
      </div>
      <div className="flex-grow"></div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
