"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { db } from '@/utils/dbConfig';

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
            <h2 className="font-bold text-3xl">Hi, {user?.fullName}</h2>
            <p className="text-gray-500">Here's what happening with your money, let's manage your expenses</p>
            <CardInfo
                budgetList={budgetList}
            />
        </div>
    )
}

export default page
