import { FlatList } from "react-native";
import ExpensesItem from "../molecules/ExpensesItem";

type Props = {
  expenses: Array<any>;
};

type ItemProps = {
  item: {
    id: string;
    date: Date;
    amount: number;
    description: string;
  };
};

const renderItem = ({ item }: ItemProps) => {
  return <ExpensesItem {...item} />;
};

const ExpensesList = ({ expenses }: Props) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
