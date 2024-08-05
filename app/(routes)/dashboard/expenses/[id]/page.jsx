"use client";
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budget/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
// import { Trash } from 'lucide-react';
import { FaTrashCan } from 'react-icons/fa6';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { IoArrowBackCircle } from "react-icons/io5";
import { MdEditNote, MdModeEditOutline } from "react-icons/md";
import EditBudget from '../_components/EditBudget';


const ExpensesScreen = ({ params }) => {

    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState();
    const [expensesList, setExpensesList] = useState([]);
    const route = useRouter()

    useEffect(() => {
        user && getBudgetInfo();
    }, [user])


    // useEffect(() => {
    //     console.log(budgetInfo);
    // }, [budgetInfo]);

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

    const deleteBudget = async () => {

        const audio = new Audio("/notification.mp3");
        const deleteExpenseResult = await db.delete(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .returning();

        if (deleteExpenseResult) {
            const result = await db.delete(Budgets)
                .where(eq(Budgets.id, params.id))
                .returning();
            if (result) {
                toast.success('Budget Deleted Successfully!', {
                    style: {
                        border: "2px solid #28a745",
                        backgroundColor: '#d4edda',
                        color: '#155724',
                        padding: '14px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '14px',
                        fontWeight: "700"
                    }
                });
                route.replace("/dashboard/budget");
                audio.play();
            }
        }


    }

    return (
        <div className="mt-16 md:mt-0 text-white p-10">
            <IoArrowBackCircle
                className="cursor-pointer text-3xl text-black bg-white hover:text-white hover:bg-black rounded-full mb-2"
                onClick={() => route.back()}
            />
            {budgetInfo && <h2 className="text-xl md:text-2xl font-bold space-y-2 md:space-y-0 md:flex items-center justify-between">
                <span className="animate-pulse">Expenses Of {budgetInfo.name}</span>
                <div className="flex gap-5 items-center">
                    <EditBudget refreshData={() => getBudgetInfo()} budgetInfo={budgetInfo} />
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                className="flex gap-2 bg-red-600 animate-pulse hover:animate-none" variant="destructive"
                            >
                                <FaTrashCan /> Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-black text-white w-[80%] rounded-lg">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your current budget along with expenses.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="bg-black text-white">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteBudget()}>Confirm</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </h2>}
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
                    budgetInfo={budgetInfo}
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
