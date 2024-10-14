import { useState, useLayoutEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import {
  RootStackNavigationProp,
  RootStackRouteProp,
} from "@/types/RootStackTypes";
import { ExpensesContext } from "@/store/expenses-context";
import IconButton from "@/components/atoms/IconButton";
import ExpenseForm from "@/components/organisms/ExpenseForm";
import { Colors } from "@/constants/Colors";
import { ExpenseProps } from "@/types/ExpenseProps";
import { storeExpense, updateExpense, deleteExpense } from "@/utils/http";
import LoadingOverlay from "@/components/atoms/LoadingOverlay";

type Props = {
  route?: RootStackRouteProp;
  navigation?: RootStackNavigationProp;
};

const ManageExpenses = ({ route, navigation }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editedExpenseId = route?.params?.expenseId;
  const isEditing = Boolean(editedExpenseId);
  const {
    expenses,
    addExpense,
    updateExpense: updateExpenseCtx,
    deleteExpense: deleteExpenseCtx,
  } = useContext(ExpensesContext);

  const selectedExpense = expenses.find(
    (expense: ExpenseProps) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation?.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const cancelHandler = () => {
    navigation?.goBack();
  };

  const deleteHandler = async () => {
    setIsSubmitting(true);
    await deleteExpense(editedExpenseId || "");
    deleteExpenseCtx(editedExpenseId || "");
    navigation?.goBack();
  };

  const confirmHandler = async (expenseData: ExpenseProps) => {
    setIsSubmitting(true);
    if (isEditing) {
      updateExpenseCtx(editedExpenseId || "", expenseData);
      await updateExpense(editedExpenseId || "", expenseData);
    } else {
      const id = await storeExpense(expenseData);
      addExpense({ id, ...expenseData });
    }
    navigation?.goBack();
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonText={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
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

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary200,
    alignItems: "center",
  },
});
