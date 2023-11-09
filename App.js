import Navigate from "./components/navigate/Navigate";
import { Provider } from "react-redux";
import { store } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetUserID = async () => {
  try {
    const value = await AsyncStorage.getItem("user");
    if (value !== null) {
      const userData = JSON.parse(value);
      console.log(userData);
      return userData.id;
    }
  } catch (error) {
    return null;
  }
};

export default function App() {
  return (
    <Provider store={store}>
      <Navigate />
    </Provider>
  );
}
