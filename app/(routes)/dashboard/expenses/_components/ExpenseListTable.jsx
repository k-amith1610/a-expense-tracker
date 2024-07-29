import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react'
import React, { useEffect } from 'react'
import { FaTrashCan } from "react-icons/fa6";
import { toast } from 'sonner';

const ExpenseListTable = ({ expensesList, refreshData }) => {

    // useEffect(() => {
    //     console.log(expensesList);
    // }, [expensesList])

    const deleteExpense = async (expenses) => {
        const audio = new Audio("/notification.mp3");
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, expenses.id))
            .returning();

        if (result) {
            toast.success('Expense Deleted Successfully!', {
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
            audio.play();
            refreshData();
        }
    }

    return (
        <div className="mt-3 text-xs md:text-[17px] border border-white rounded-lg">
            <div className="grid grid-cols-4 bg-black p-3 font-bold rounded-t-lg">
                <h2>Name</h2>
                <h2>Amount</h2>
                <h2>Date</h2>
                <h2>Action</h2>
            </div>
            {expensesList.map((expenses, index) => (
                <div key={index} className="grid grid-cols-4 bg-slate-800 text-slate-300 font-medium p-3">
                    <h2>{expenses.name}</h2>
                    <h2>{expenses.amount}</h2>
                    <h2>{expenses.createdAt}</h2>
                    <h2 className="ml-3 mt-[2px] md:mt-0">
                        <FaTrashCan
                            className="text-red-600 cursor-pointer text-[14px] md:text-[17px]"
                            onClick={() => deleteExpense(expenses)}
                        />
                    </h2>
                </div>
            ))}
        </div>
    )
}

export default ExpenseListTable
