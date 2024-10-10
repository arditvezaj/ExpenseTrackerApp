import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  expenses: Array<any>;
  periodName: string;
};

const ExpensesSummary = ({ expenses, periodName }: Props) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderRadius: 6,
    backgroundColor: Colors.primary50,
  },
  period: {
    fontSize: 13,
    color: Colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary500,
  },
});
