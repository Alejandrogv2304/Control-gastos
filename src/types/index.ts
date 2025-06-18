export type Expense ={
    id: string;
    expenseName: string;
    category: string;
    date: Value;
    amount: number
}

//Para usar el mismo type de Expense pero sin una característica
export type DraftExpense = Omit<Expense, 'id'>

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Category ={
     id: string;
    name: string;
    icon: string;
}