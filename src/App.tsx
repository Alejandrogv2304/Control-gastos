import BudgetForm from "./components/BudgetForm"
import BudgetTracker from "./components/BudgetTracker";
import { useBudget } from "./hooks/useBudget"
import { useMemo } from "react";

function App() {
  
  const {state} = useBudget();
  console.log(state.budget)

  const isValid = useMemo(() => state.budget > 0 ,[state.budget])
  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase font-black text-center text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValid ? <BudgetTracker/>:<BudgetForm/>}
      </div>
    </>
  )
}

export default App
