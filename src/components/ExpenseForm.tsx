import React,{ ChangeEvent, useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";



export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date ()
    })
    const [error, setError] = useState('');
    const [previousAmount, setPreviousAmount] = useState(0);

    const {dispatch, state, disponible} = useBudget()

//Con este UseEffect lo que hacemos es identificar el expense que estamos modificando y llenar el formulario con sus datos
//mediante el state
    useEffect(()=>{
      if(state.editingId){
        const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)
        [0]
        setExpense(editingExpense)
        setPreviousAmount(editingExpense.amount)
      }
    },[state.editingId])

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()

      //Validación
      if(Object.values(expense).includes('')){
        setError('Todos los campos son obligatorios')
        return
      }

       //Validación de que no me pase de presupuesto
      if((expense.amount- previousAmount) > disponible){
        setError('Presupuesto alcanzado')
        return
      }

      //Agregar un nuevo gasto
      if(state.editingId){
        dispatch({type:'update-expense', payload:{expense: {id:state.editingId, ...expense}}})
      }else{
        dispatch({type:'add-expense', payload:{expense}})
      }
      

      //Reiniciar el state
      setExpense({amount: 0,
        expenseName: '',
        category: '',
        date: new Date ()})

        setPreviousAmount(0)
    }
  return (
    
      <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase py-2 border-blue-500 text-center text-2xl font-black border-b-4">
            {state.editingId ? 'Guardar Cambios':'Nuevo Gasto'}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}
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
            value={state.editingId ? 'Guardar Cambios':'Registrar Gasto'}/>
      </form>
    
  )
}
