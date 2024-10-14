import { useState, useContext, useEffect } from "react";
import { ExpensesContext } from "@/store/expenses-context";
import ExpensesOutput from "@/components/organisms/ExpensesOutput";
import { ExpenseProps } from "@/types/ExpenseProps";
import { getExpenses } from "@/utils/http";
import LoadingOverlay from "@/components/atoms/LoadingOverlay";

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const { expenses, setExpenses } = useContext(ExpensesContext);

  useEffect(() => {
    const getExpensesFunction = async () => {
      setIsFetching(true);
      const expenses = await getExpenses();
      setIsFetching(false);
      setExpenses(expenses);
    };

    getExpensesFunction();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

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
