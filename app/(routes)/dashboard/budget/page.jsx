import React from 'react'
import BudgetList from './_components/BudgetList'

const page = () => {
  return (
    <div className="p-10 bg-slate-900 h-screen">
      <h2 className="font-bold text-3xl text-white">My Budgets</h2>
      <BudgetList />
    </div>
  )
}

export default page
