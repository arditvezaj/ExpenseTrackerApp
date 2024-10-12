import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  ManageExpenses: { expenseId: string };
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type RootStackRouteProp = RouteProp<RootStackParamList>;
