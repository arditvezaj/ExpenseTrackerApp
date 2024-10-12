import { useContext } from "react";
import { ExpensesContext } from "@/store/expenses-context";
import ExpensesOutput from "@/components/organisms/ExpensesOutput";
import { ExpenseProps } from "@/types/ExpenseProps";

const RecentExpenses = () => {
  const { expenses } = useContext(ExpensesContext);
  const recentExpenses = expenses.filter(
    (expense: ExpenseProps) =>
      expense.date > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;
