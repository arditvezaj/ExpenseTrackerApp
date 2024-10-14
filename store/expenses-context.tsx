import { createContext, useReducer } from "react";
import { ExpenseProps } from "@/types/ExpenseProps";

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses: any) => {},
  addExpense: ({ description, amount, date }: ExpenseProps) => {},
  updateExpense: (
    id: string,
    { description, amount, date }: ExpenseProps
  ) => {},
  deleteExpense: (id: string) => {},
});

const expensesReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const invertedExpenses = action.payload.reverse();
      return invertedExpenses;
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense: ExpenseProps) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = {
        ...updatableExpense,
        ...action.payload.data,
      };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter(
        (expense: ExpenseProps) => expense.id !== action.payload
      );
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }: React.PropsWithChildren) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const setExpenses = (expenses: ExpenseProps[]) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const addExpense = (expenseData: ExpenseProps) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const updateExpense = (id: string, expenseData: ExpenseProps) => {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const value = {
    expenses: expensesState,
    setExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
