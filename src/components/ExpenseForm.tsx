import React,{ ChangeEvent, useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';



export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date ()
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) =>{
      const {name, value} = e.target;
      const isAmountField = ['amount'].includes(name)

      setExpense({
        ...expense,
        [name] : isAmountField ? +value : value
      })
    }

    const handleChangeData = (value: Value) =>{
    setExpense({
        ...expense,
        date:value
    })
    }
  return (
    
      <form className="space-y-5">
        <legend className="uppercase py-2 border-blue-500 text-center text-2xl font-black border-b-4">
            Nuevo Gasto
            </legend>
            <div className="flex flex-col gap-2">
                <label
                htmlFor="expenseName"
                className="text-xl">
                Nombre Gasto:
                </label>
                <input
                type="text"
                id="expenseName"
                placeholder="Añade el nombre del gasto"
                className="bg-slate-100 p-2"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}/>
            </div>

            <div className="flex flex-col gap-2">
                <label
                htmlFor="amount"
                className="text-xl">
                Cantidad:
                </label>
                <input
                type="number"
                id="amount"
                placeholder="Añade la cantidad del gasto"
                className="bg-slate-100 p-2"
                name="amount"
                value={expense.amount}
                onChange={handleChange}/>
            </div>

             <div className="flex flex-col gap-2">
                <label
                htmlFor="category"
                className="text-xl">
                Cantegoría:
                </label>
                <select
                id="category"
                className="bg-slate-100 p-2"
                name="category"
                value={expense.category}
                onChange={handleChange}>
                    <option value="">-- Seleccione --</option>
                    {categories.map(category =>(
                        <option 
                        key={category.id}
                        value={category.id}
                        >
                        {category.name}
                        </option>
                    ))}
                </select>
            </div>

             <div className="flex flex-col gap-2">
                <label
                htmlFor="amount"
                className="text-xl">
                Fecha Gasto:
                </label>
                <DatePicker
                className='bg-slate-100 p-2 border-0'
                value={expense.date}
                onChange={handleChangeData}/>
            </div>

            <input
            type="submit"
            className="bg-blue-600 cursor-pointer w-full p-2 rounded-lg uppercase font-bold text-white"
            value={'Registrar Gasto'}/>
      </form>
    
  )
}
