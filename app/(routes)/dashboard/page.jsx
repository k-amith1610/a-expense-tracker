"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { db } from '@/utils/dbConfig';
import BarChartDashboard from './_components/BarChartDashboard';

const page = () => {

    const { user } = useUser();

    const [budgetList, setBudgetList] = useState([]);

    useEffect(() => {
        user && getBudgetList();
    }, [user]);

    const getBudgetList = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`SUM(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
            .groupBy(Budgets.id)
            .orderBy(desc(Budgets.id));

        setBudgetList(result);
    }

    return (
        <div className="text-white p-8">
            {user ?
                <div>
                    <h2 className="font-bold text-3xl">Hi, {user?.fullName}</h2>
                    <p className="text-gray-500">Here's what happening with your money, let's manage your expenses</p>
                </div> :
                <div>
                    <h2 className="w-[160px] p-2 h-[30px] rounded-lg bg-slate-800 animate-pulse"></h2>
                    <p className="w-[260px] mt-3 h-[20px] rounded-lg bg-slate-800 animate-pulse"></p>
                </div>
            }
            <CardInfo
                budgetList={budgetList}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 mt-10">
                {user ?
                    <div className="md:col-span-2 w-full lg:w-[70%]">
                        <BarChartDashboard
                            budgetList={budgetList}
                        />
                    </div> :
                    <div className="md:cols-span-2 w-full h-[350px] bg-slate-800 rounded-lg animate-pulse">

                    </div>
                }
                <div>
                    Other Content
                </div>
            </div>
        </div>
    )
}

export default page
