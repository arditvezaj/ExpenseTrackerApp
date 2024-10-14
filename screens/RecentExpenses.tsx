import { useState, useContext, useEffect } from "react";
import { ExpensesContext } from "@/store/expenses-context";
import ExpensesOutput from "@/components/organisms/ExpensesOutput";
import { ExpenseProps } from "@/types/ExpenseProps";
import { getExpenses } from "@/utils/http";
import LoadingOverlay from "@/components/atoms/LoadingOverlay";
import ErrorOverlay from "@/components/atoms/ErrorOverlay";

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const { expenses, setExpenses } = useContext(ExpensesContext);

  useEffect(() => {
    const getExpensesFunction = async () => {
      setIsFetching(true);
      try {
        const expenses = await getExpenses();
        setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    };

    getExpensesFunction();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

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
