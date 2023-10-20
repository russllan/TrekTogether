import Navigate from "./components/navigate/Navigate";
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <Navigate />
    </Provider>
  );
}
