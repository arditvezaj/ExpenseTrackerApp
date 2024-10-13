import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";
import { Colors } from "@/constants/Colors";

type Props = {
  label: string;
  style?: any;
  invalid: boolean;
  textInputConfig: {
    value: string;
    onChangeText: (text: string) => void;
    type: KeyboardTypeOptions;
    placeholder: string;
    maxLength?: number;
    multiline?: boolean;
  };
};

const Input = ({ label, invalid, style, textInputConfig }: Props) => {
  const inputStyles: any = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 6,
    fontSize: 16,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: { color: Colors.error500 },
  invalidInput: {
    backgroundColor: Colors.error50,
  },
});
