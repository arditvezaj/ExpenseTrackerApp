import axios from "axios";

type ExpenseProps = {
  date: Date;
  amount: number;
  description: string;
};

const url =
  "https://expenses-app-d91b7-default-rtdb.europe-west1.firebasedatabase.app";

export const storeExpense = async (expenseData: ExpenseProps) => {
  try {
    const response = await axios.post(url + "/expenses.json", expenseData);
    const id = response.data.name;
    return id;
  } catch (error) {
    console.log(error);
  }
};

export const getExpenses = async () => {
  try {
    const response = await axios.get(url + "/expenses.json");

    const expenses: ExpenseProps[] = [];

    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description,
      };
      expenses.push(expenseObj);
    }

    return expenses;
  } catch (error) {
    console.log(error);
  }
};

export const updateExpense = (id: string, expenseData: ExpenseProps) => {
  try {
    return axios.put(`${url}/expenses/${id}.json`, expenseData);
  } catch (error) {
    console.log(error);
  }
};

export const deleteExpense = async (id: string) => {
  try {
    return axios.delete(`${url}/expenses/${id}.json`);
  } catch (error) {
    console.log(error);
  }
};
