"use client"

import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { toast } from 'sonner'

const CreateBudget = ({ refreshData }) => {

    const [emojiIcon, setEmojiIcon] = useState('🙂');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const budgetCategoriesEg = [
        { name: "Residential Expenses", amount: 1000 },
        { name: "Household Appliances", amount: 500 },
        { name: "Interior Furnishings", amount: 300 },
        { name: "Culinary Expenses", amount: 200 },
        { name: "Healthcare", amount: 800 },
        { name: "Transportation and Travel", amount: 1050 },
        { name: "Utilities", amount: 400 },
        { name: "Entertainment and Leisure", amount: 250 },
        { name: "Education and Training", amount: 600 },
        { name: "Personal Care and Wellness", amount: 100 },
        { name: "Housing", amount: 1200 },
        { name: "Home Appliances", amount: 700 },
        { name: "Home Decor", amount: 350 },
        { name: "Food", amount: 1000 },
        { name: "Health", amount: 500 },
        { name: "Transportation", amount: 1200 }
    ];

    const getRandomBudget = () => {
        return budgetCategoriesEg[Math.floor(Math.random() * budgetCategoriesEg.length)];
    }

    const [placeholder, setPlaceholder] = useState(getRandomBudget());

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholder(getRandomBudget());
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const { user } = useUser();
    const onCreateBudget = async () => {
        const audio = new Audio("/notification.mp3");
        const result = await db.insert(Budgets)
            .values({
                name: name,
                amount: amount,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                icon: emojiIcon
            }).returning({ insertedId: Budgets.id })

        if (result) {
            refreshData();
            toast.success('New Budget Created!', {
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
    }

    return (
        <div className='text-white'>
            <Dialog>
                <DialogTrigger asChild>
                    <div
                        className='bg-black text-white p-10 rounded-md
                    items-center flex flex-col space-y-2 border-2 border-dashed 
                    cursor-pointer hover:shadow-md hover:shadow-gray-300 border-white '
                    >
                        <h2 className="text-3xl rounded-full bg-slate-800 w-9 text-center">+</h2>
                        <h2>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent className="bg-black text-white w-[80%] rounded-lg">
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                        <DialogDescription>
                            <div className="mt-5">
                                <button
                                    type="button"
                                    className="text-xl p-1 border border-green-500 rounded-lg
                                    bg-white"
                                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                                >
                                    {emojiIcon}
                                </button>
                                <div className='absolute py-2 z-20'>
                                    <EmojiPicker
                                        open={openEmojiPicker}
                                        onEmojiClick={(e) => {
                                            setEmojiIcon(e.emoji)
                                            setOpenEmojiPicker(false)
                                        }}
                                    />
                                </div>
                                <div className="py-2 flex flex-col space-y-2">
                                    <h2
                                        className="font-semibold"
                                    >
                                        Budget Name
                                    </h2>
                                    <Input
                                        placeholder={`e.g. ${placeholder.name}`}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="py-2 flex flex-col space-y-2">
                                    <h2
                                        className="font-semibold"
                                    >
                                        Budget Amount
                                    </h2>
                                    <Input
                                        type="number"
                                        placeholder={`e.g. ${placeholder.amount}`}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <div className="mt-5 w-full flex justify-center">
                                <Button
                                    disabled={!(name && amount)}
                                    className="text-center w-full"
                                    onClick={() => onCreateBudget()}
                                >
                                    Create Budget
                                </Button>
                            </div>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateBudget
