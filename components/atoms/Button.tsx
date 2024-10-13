import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

type Props = {
  onPress: () => void;
  children: string;
  mode?: string;
  style?: any;
};

const Button = ({ onPress, children, mode, style }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <View style={[styles.container, mode === "flat" && styles.flat]}>
        <Text style={[styles.text, mode === "flat" && styles.flatText]}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  flatText: {
    color: Colors.primary500,
  },
});
