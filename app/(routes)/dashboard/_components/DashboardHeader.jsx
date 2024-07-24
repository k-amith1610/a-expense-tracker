import { UserButton } from '@clerk/nextjs'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className="p-4 shadow-sm border-b flex justify-between bg-slate-950">
        <div className="">
            
        </div>
        <div className="">
            <UserButton />
        </div>
    </div>
  )
}

export default DashboardHeader
