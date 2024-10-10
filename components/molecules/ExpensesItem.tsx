import { Colors } from "@/constants/Colors";
import { View, Text, Pressable, StyleSheet } from "react-native";

type Props = {
  description: string;
  amount: number;
  date: Date;
};

const ExpensesItem = ({ description, amount, date }: Props) => {
  return (
    <Pressable style={styles.container}>
      <View>
        <Text style={[styles.text, styles.description]}>{description}</Text>
        <Text style={styles.text}>{date.toLocaleDateString()}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>${amount.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
};

export default ExpensesItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
    backgroundColor: Colors.primary400,
  },
  text: {
    color: Colors.primary50,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  amountContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#fff",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    fontWeight: "bold",
    color: Colors.primary500,
  },
});
