"use client"
import React from 'react'
import Image from "next/image"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => {

  const { user, isSignedIn } = useUser();

  const clicked = () => {
    const audio = new Audio("/button.wav");
    audio.play();
  }

  return (
    <div className='fixed w-full'>
      <div className="w-full p-4 flex justify-between items-center shadow-lg bg-black">
        <Image src={'/etlogo1.png'}
          alt='logo'
          width={140}
          height={100}
          className='rounded-t-md bg-blue-400'
        />
        {isSignedIn ?
          <span className="px-3"><UserButton /></span> :
          <Link href={"/dashboard"}>
            <Button
              className="hover:bg-white border border-slate-900 border-y-2 border-x-2 hover:text-black"
              onClick={() => clicked()}
            >
              Get Started
            </Button>
          </Link>
        }
      </div>
      <div className="w-[90%] md:w-[98%] mx-auto border border-gray-200 "></div>
    </div>
  )
}

export default Header
