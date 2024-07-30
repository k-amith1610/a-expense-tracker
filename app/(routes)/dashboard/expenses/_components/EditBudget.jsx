"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { MdEditNote } from 'react-icons/md'
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
import { useUser } from '@clerk/nextjs'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'

const EditBudget = ({ budgetInfo, refreshData }) => {


    const [emojiIcon, setEmojiIcon] = useState(budgetInfo.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState(budgetInfo.name);
    const [amount, setAmount] = useState(budgetInfo.amount);
    const { user } = useUser();

    const onUpdateBudget = async () => {
        const audio = new Audio("/notification.mp3");
        const result = await db.update(Budgets).set({
            name: name,
            amount: amount,
            icon: emojiIcon
        }).where(eq(Budgets.id, budgetInfo.id))
            .returning()

        if (result) {
            refreshData();
            toast.success('Budget Update!!!', {
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
        <div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="flex gap-1 items-center
                    animate-pulse hover:animate-none"
                    >
                        <MdEditNote className="text-2xl" />{" "}Update
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-black text-white w-[80%] rounded-lg">
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
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
                                        placeholder={`e.g. Housing`}
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
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
                                        placeholder={`e.g. 2000`}
                                        onChange={(e) => setAmount(e.target.value)}
                                        value={amount}
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
                                    onClick={() => onUpdateBudget()}
                                >
                                    Update Budget
                                </Button>
                            </div>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget
