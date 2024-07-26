"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/utils/dbConfig'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'

const BudgetList = () => {


    const { user } = useUser();
    const [budgetList, setBudgetList] = useState([]);

    useEffect(() => {
        user && getBudgetList();
    }, [user])

    const getBudgetList = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`SUM(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.id))
            .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
            .groupBy(Budgets.id);
        setBudgetList(result);
    }

    return (
        <div className="mt-7">
            <div
                className="grid grid-cols-1
                md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
                <CreateBudget />
                {budgetList.map((budget, index) => (
                    <BudgetItem budget={budget} key={index} />
                ))}
            </div>
        </div>
    )
}

export default BudgetList
