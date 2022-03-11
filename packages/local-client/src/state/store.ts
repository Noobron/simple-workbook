import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { persistMiddleWare } from "./middlewares/persist-middleware";
import rootReducer from "./reducers";

const store = createStore(rootReducer, {}, applyMiddleware(thunk, persistMiddleWare));

export default store;
