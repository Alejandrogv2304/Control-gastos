import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react"
import { initialState, budgetReducer, BudgetState, BudgetActions } from "../reducers/BudgetReducer"

//Type para los props que le pasamos al context
export type BudgetContextProps={
state:BudgetState,
dispatch: Dispatch<BudgetActions>,
totalExpenses:number,
disponible:number
}

//Type para los props del provider
type BudgetProviderProps ={
    children : ReactNode
}

//El context espera los props de state y dispatch, y se los estamos pasando en el value del Provider
export const BudgetContext = createContext<BudgetContextProps>(null!);
export const BudgetProvider = ({children}: BudgetProviderProps) =>{

    const [state,dispatch]= useReducer(budgetReducer, initialState);

    const totalExpenses = useMemo(()=> state.expenses.reduce((total,expense)=> expense.amount + total, 0),
      [state.expenses]);
    
      const disponible = state.budget - totalExpenses;
return(
 <BudgetContext.Provider
 value={{
    state,
    dispatch,
    totalExpenses,
    disponible
 }}>
  {children}
 </BudgetContext.Provider>
)
}