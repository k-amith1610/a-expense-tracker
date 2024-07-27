"use client"

import React from 'react'
import { FaIndianRupeeSign } from "react-icons/fa6";

const BudgetItem = ({ budget }) => {
    return (
        <div className='p-5 border rounded-lg text-white hover:shadow-md hover:shadow-gray-500 cursor-pointer bg-black'>
            <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2 items-center">
                    <h2
                        className="text-2xl p-2
                    bg-slate-200 rounded-full flex justify-center
                    items-center"
                    >
                        {budget?.icon}
                    </h2>
                    <div>
                        <h2 className="font-bold">{budget.name}</h2>
                        <h2 className="text-sm text-gray-400 text-semibold">{budget.totalItem} Item</h2>
                    </div>
                </div>
                <h2 className="flex justify-center items-center font-bold text-primary"><FaIndianRupeeSign className="text-sm" />{budget.amount}</h2>
            </div>
            <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xs text-slate-400 flex items-center"><FaIndianRupeeSign className="text-xs" />{budget.totalSpend ? budget.totalSpend : 0} Spent</h2>
                    <h2 className="text-xs text-slate-400 flex items-center"><FaIndianRupeeSign className="text-xs" />{budget.amount - budget.totalSpend} Remaining</h2>
                </div>
                <div className="w-full bg-slate-300 h-2 rounded-full">
                    <div className="w-[30%] bg-primary h-2 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}

export default BudgetItem
