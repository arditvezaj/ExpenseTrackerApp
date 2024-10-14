import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

type Props = {
  message: string;
};

const ErrorOverlay = ({ message }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.primary100,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
