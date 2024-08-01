"use client"
import { PiggyBank } from 'lucide-react'
import React, { useEffect } from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import { BsPiggyBankFill } from "react-icons/bs";
import { GiPiggyBank } from "react-icons/gi";
import { FaReceipt } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";

const CardInfo = ({ budgetList }) => {


    useEffect(() => {
        calculateCardInfo();
    }, [budgetList])

    const calculateCardInfo = () => {
        console.log(budgetList);
    }

    return (
        <div className="mt-7 grid grids-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-10 border rounded-lg flex items-center justify-between bg-black">
                <div className="">
                    <h2 className="text-sm">Total Budget</h2>
                    <h2 className="flex items-center font-bold text-2xl"><FaRupeeSign className="text-xl" />15000</h2>
                </div>
                <GiPiggyBank className="bg-primary p-2 h-12 w-12 rounded-full" />
            </div>
            <div className="p-10 border rounded-lg flex items-center justify-between bg-black">
                <div className="">
                    <h2 className="text-sm">Total Spent</h2>
                    <h2 className="flex items-center font-bold text-2xl"><FaRupeeSign className="text-xl" />15000</h2>
                </div>
                <div className="bg-primary p-3 h-12 w-12 rounded-full flex items-center justify-center text-2xl"><FaReceipt className="" /></div>
            </div>
            <div className="p-10 border rounded-lg flex items-center justify-between bg-black">
                <div className="">
                    <h2 className="text-sm">Budgets Created</h2>
                    <h2 className="flex items-center font-bold text-2xl"><FaRupeeSign className="text-xl" />15000</h2>
                </div>
                <div className="bg-primary p-3 h-12 w-12 rounded-full flex items-center justify-center text-2xl"><FaWallet className="" /></div>
            </div>
        </div>
    )
}

export default CardInfo
