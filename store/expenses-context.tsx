import { createContext, useReducer } from "react";
import { ExpenseProps } from "@/types/ExpenseProps";

const ExpensesData = [
  {
    id: "e1",
    date: new Date("2024-10-10"),
    amount: 59.99,
    description: "Lunch",
  },
  {
    id: "e2",
    date: new Date("2024-10-01"),
    amount: 49.99,
    description: "A pair of shoes",
  },
  {
    id: "e3",
    date: new Date("2024-07-20"),
    amount: 19.99,
    description: "Some bananas",
  },
  {
    id: "e4",
    date: new Date("2024-06-30"),
    amount: 10.99,
    description: "A book",
  },
  {
    id: "e5",
    date: new Date("2024-05-20"),
    amount: 20.99,
    description: "A pair of socks",
  },
];

export const ExpensesContext = createContext({
  expenses: [],
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
      const id =
        new Date().toString() + Math.random().toString(36).substring(7);
      return [{ ...action.payload, id }, ...state];
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
  const [expensesState, dispatch] = useReducer(expensesReducer, ExpensesData);

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
