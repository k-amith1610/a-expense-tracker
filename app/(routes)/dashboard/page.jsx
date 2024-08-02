"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { db } from '@/utils/dbConfig';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budget/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

const page = () => {

    const { user } = useUser();

    const [budgetList, setBudgetList] = useState([]);
    const [expensesList, setExpensesList] = useState([]);

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
        getAllExpenses();
    }

    const getAllExpenses = async () => {
        const result = await db.select({
            id: Expenses.id,
            name: Expenses.name,
            amount: Expenses.amount,
            createdAt: Expenses.createdAt
        }).from(Budgets)
            .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
            .orderBy(desc(Expenses.id));

        setExpensesList(result);
    }

    // useEffect(() => {
    //     console.log(expensesList);
    // }, [expensesList])

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
            <div className="grid grid-cols-1 lg:grid-cols-3 mt-10 gap-5">
                {user ?
                    <div className="md:col-span-2 flex flex-col gap-4">
                        <BarChartDashboard
                            budgetList={budgetList}
                        />

                        <div className="flex flex-col gap-1 mt-2">
                            <h2 className="text-lg font-bold">Latest Expenses</h2>
                            <ExpenseListTable
                                expensesList={expensesList}
                                refreshData={() => getBudgetList()}
                            />
                        </div>

                    </div> :
                    <div className="md:col-span-2 flex flex-col gap-4">
                        <div className="w-full h-[350px] bg-slate-800 rounded-lg animate-pulse"></div>
                        <div className="w-1/3 h-[20px] rounded-lg animate-pulse bg-slate-800"></div>
                        <div className="w-full h-[350px] bg-slate-800 rounded-lg animate-pulse"></div>
                    </div>
                }
                <div className="grid gap-3">
                    {user ?
                        <h2 className="font-bold text-lg">Latest Budgets</h2> :
                        <h2 className="w-1/2 h-[20px] rounded-lg animate-pulse bg-slate-800"></h2>
                    }
                    {user ?
                        budgetList.map((budget, index) => (
                            /** index < 4 && **/
                            <BudgetItem
                                budget={budget}
                                key={index}
                            />
                        )) :
                        [1, 2, 3, 4].map((index) => (
                            <div key={index} className="rounded-lg bg-slate-800 animate-pulse h-[150px]">

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default page
