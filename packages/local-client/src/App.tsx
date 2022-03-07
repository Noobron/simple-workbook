import { Provider } from "react-redux";
import BlockList from "./components/BlockList";
import store from "./state/store";

function App() {
  return (
    <Provider store={store}>
      <BlockList />
    </Provider>
  );
}

export default App;
