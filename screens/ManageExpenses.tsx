import { useLayoutEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import {
  RootStackNavigationProp,
  RootStackRouteProp,
} from "@/types/RootStackTypes";
import { ExpensesContext } from "@/store/expenses-context";
import IconButton from "@/components/atoms/IconButton";
import Button from "@/components/atoms/Button";
import { Colors } from "@/constants/Colors";

type Props = {
  route?: RootStackRouteProp;
  navigation?: RootStackNavigationProp;
};

const ManageExpenses = ({ route, navigation }: Props) => {
  const editedExpenseId = route?.params?.expenseId;
  const isEditing = Boolean(editedExpenseId);
  const { addExpense, updateExpense, deleteExpense } =
    useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation?.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteHandler = () => {
    deleteExpense(editedExpenseId || "");
    navigation?.goBack();
  };

  const cancelHandler = () => {
    navigation?.goBack();
  };

  const confirmHandler = () => {
    if (isEditing) {
      console.log(editedExpenseId);

      updateExpense(editedExpenseId || "", {
        description: "test",
        amount: 10,
        date: new Date(),
      });
    } else {
      addExpense({
        description: "test",
        amount: 10,
        date: new Date(),
      });
    }
    navigation?.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={Colors.error500}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary100,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary200,
    alignItems: "center",
  },
});
