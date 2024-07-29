"use client";
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budget/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';

const ExpensesScreen = ({ params }) => {

    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState();
    const [expensesList, setExpensesList] = useState([]);

    useEffect(() => {
        user && getBudgetInfo();
    }, [user])


    // useEffect(() => {
    //     console.log(expensesList);
    // }, [expensesList]);

    const getBudgetInfo = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`SUM(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, params.id))
            .groupBy(Budgets.id)

        // if (result) {
        //     setBudgetInfo(result);
        //     console.log(budgetInfo);
        // }
        // console.log(result[0]);
        setBudgetInfo(result[0]);
        getExpensesList();
        // console.log(budgetInfo);
    }

    const getExpensesList = async () => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .orderBy(desc(Expenses.id));


        // console.log(result);
        setExpensesList(result);
        // console.log(expensesList);
    }

    return (
        <div className="text-white p-10">
            <h2 className="text-2xl font-bold animate-pulse">My Expenses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
                {budgetInfo ? <BudgetItem
                    budget={budgetInfo}
                /> :
                    <div
                        className="w-full bg-slate-600 opacity-40 rounded-lg h-[150px] animate-pulse"
                    >
                    </div>
                }
                <AddExpense
                    budgetId={params.id}
                    user={user}
                    refreshData={() => getBudgetInfo()}
                />
            </div>
            <div className="mt-4">
                <h2 className="font-bold text-large">Latest Expenses</h2>
                <ExpenseListTable
                    expensesList={expensesList}
                    refreshData={() => getBudgetInfo()}
                />
            </div>
        </div>
    )
}

export default ExpensesScreen
