import { useContext } from "react";
import { ExpensesContext } from "@/store/expenses-context";
import ExpensesOutput from "@/components/organisms/ExpensesOutput";

const AllExpenses = () => {
  const { expenses } = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found."
    />
  );
};

export default AllExpenses;
