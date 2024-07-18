import React from 'react'
import Image from "next/image"
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <div className='fixed w-full'>
      <div className="w-full p-4 flex justify-between items-center shadow-lg bg-black">
        <Image src={'/etlogo1.png'}
          alt='logo'
          width={140}
          height={100}
          className='rounded-t-md bg-blue-400'
        />
        <Button className="hover:bg-white border border-slate-900 border-y-2 border-x-2 hover:text-black">Get Started</Button>
      </div>
      <div className="w-[90%] md:w-[98%] mx-auto border border-gray-200 "></div>
    </div>
  )
}

export default Header
