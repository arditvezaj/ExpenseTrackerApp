import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { ExpenseProps } from "@/types/ExpenseProps";
import { Colors } from "@/constants/Colors";

type Props = {
  submitButtonText: string;
  onCancel: () => void;
  onSubmit: (data: ExpenseProps) => void;
  defaultValues?: ExpenseProps;
};

const ExpenseForm = ({
  defaultValues,
  submitButtonText,
  onCancel,
  onSubmit,
}: Props) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const onChangeText = (identifier: string, value: string) => {
    setInputs((prev) => ({ ...prev, [identifier]: { value, isValid: true } }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: Number(inputs.amount.value),
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (amountIsValid && dateIsValid && descriptionIsValid) {
      onSubmit(expenseData);
    } else {
      setInputs((prev) => ({
        ...prev,
        amount: { value: prev.amount.value, isValid: amountIsValid },
        date: { value: prev.date.value, isValid: dateIsValid },
        description: {
          value: prev.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.innerContainer}>
        <Input
          label="Amount"
          style={styles.input}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            type: "decimal-pad",
            value: inputs.amount.value,
            onChangeText: (event: string) => onChangeText("amount", event),
            placeholder: "Amount",
          }}
        />
        <Input
          label="Date"
          style={styles.input}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            type: "default",
            value: inputs.date.value,
            onChangeText: (event: string) => onChangeText("date", event),
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          type: "default",
          value: inputs.description.value,
          onChangeText: (event: string) => onChangeText("description", event),
          placeholder: "Description",
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonText}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 24,
  },
  input: {
    flex: 1,
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
  errorText: {
    textAlign: "center",
    color: Colors.error500,
    margin: 8,
    marginBottom: 16,
  },
});
