"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { Loader2 } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const AddExpense = ({ budgetId, user, refreshData, budgetInfo }) => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);



    const expenseCategoriesEg = [
        { "name": "Property Tax", "amount": 300 },
        { "name": "Refrigerator", "amount": 3000 },
        { "name": "Washing Machine", "amount": 2020 },
        { "name": "Sofa", "amount": 55000 },
        { "name": "Coffee Table", "amount": 150 },
        { "name": "Groceries", "amount": 150 },
        { "name": "Dining Out", "amount": 500 },
        { "name": "Doctor Visits", "amount": 400 },
        { "name": "Medications", "amount": 400 },
        { "name": "Gasoline", "amount": 600 },
        { "name": "Public Transport", "amount": 450 },
        { "name": "Electricity Bill", "amount": 200 },
        { "name": "Water Bill", "amount": 200 },
        { "name": "Movies", "amount": 100 },
        { "name": "Online Courses", "amount": 400 },
        { "name": "Books", "amount": 200 },
        { "name": "Gym Membership", "amount": 600 },
        { "name": "Skincare Products", "amount": 40 },
        { "name": "Rent", "amount": 10000 },
        { "name": "Maintenance", "amount": 200 },
        { "name": "Microwave", "amount": 3000 },
        { "name": "Vacuum Cleaner", "amount": 4000 },
        { "name": "Wall Art", "amount": 100 },
        { "name": "Curtains", "amount": 250 },
        { "name": "Groceries", "amount": 210 },
        { "name": "Dining Out", "amount": 300 },
        { "name": "Doctor Visits", "amount": 250 },
        { "name": "Medications", "amount": 250 },
        { "name": "Fuel", "amount": 700 },
        { "name": "Car Maintenance", "amount": 500 }
    ];

    const getRandomExpense = () => {
        return expenseCategoriesEg[Math.floor(Math.random() * expenseCategoriesEg.length)];
    }

    const [placeholder, setPlaceholder] = useState({ name: '', amount: '' });

    useEffect(() => {
        setPlaceholder(getRandomExpense());
        const interval = setInterval(() => {
            setPlaceholder(getRandomExpense());
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const checkExpenseAndAdd = async () => {
        // console.log(budgetInfo.amount);
        // console.log(budgetInfo.totalSpend);
        setLoading(true);
        let remaining = Number(budgetInfo.amount) - budgetInfo.totalSpend;
        // console.log(remaining);
        const audio = new Audio("/error.mp3");
        if (Number(amount) > remaining) {
            setLoading(false);
            audio.play();
            // setName("");
            // setAmount("");
            refreshData();
            toast.error('Budget limit exceeded!', {
                style: {
                    border: "2px solid #a72828",
                    backgroundColor: '#edd4d4',
                    color: '#571515',
                    padding: '14px',
                    borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                    fontWeight: "700"
                }
            });

            return;
        }
        addNewExpense();

    }

    const addNewExpense = async () => {
        // setLoading(true);
        const audio = new Audio("/notification.mp3");

        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdAt: moment().format("DD/MM/YYYY")
        }).returning({ insertedId: Budgets.id })

        if (result) {
            setLoading(false);
            setName("");
            setAmount("");
            refreshData();
            toast.success('New Expense Added!', {
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
        }
        setLoading(false);
    }

    return (
        <div className="border p-5 rounded-lg bg-black">
            <h2 className="font-bold text-lg">Add Expense</h2>
            <div className="py-2 flex flex-col space-y-2">
                <h2
                    className="font-semibold"
                >
                    Expense Name
                </h2>
                <Input
                    placeholder={`e.g. ${placeholder.name}`}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </div>
            <div className="py-2 flex flex-col space-y-2">
                <h2
                    className="font-semibold"
                >
                    Expense Amount
                </h2>
                <Input
                    type="number"
                    placeholder={`e.g. ${placeholder.amount}`}
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                />
            </div>
            <Button
                disabled={!(name && amount)}
                className="mt-3 w-full"
                onClick={() => checkExpenseAndAdd()}
            >
                {loading ? <Loader2
                    className="animate-spin"
                /> :
                    "Add New Expense"}
            </Button>
        </div>
    )
}

export default AddExpense
