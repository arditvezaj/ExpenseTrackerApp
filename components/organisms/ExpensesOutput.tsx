import { View, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { Colors } from "@/constants/Colors";

type Props = {
  expenses?: Array<any>;
  expensesPeriod: string;
};

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

const ExpensesOutput = ({ expenses, expensesPeriod }: Props) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={ExpensesData} periodName={expensesPeriod} />
      <ExpensesList expenses={ExpensesData} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: Colors.primary100,
  },
});
