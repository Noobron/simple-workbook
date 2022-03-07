import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { ActionType } from "./action-types";
import { defaultBlockContent } from "./block";
import rootReducer from "./reducers";

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;

store.dispatch({
  type: ActionType.INSERT_BLOCK_AFTER,
  payload: {
    id: null,
    type: "code",
    extension: defaultBlockContent,
  },
});

store.dispatch({
  type: ActionType.INSERT_BLOCK_AFTER,
  payload: {
    id: null,
    type: "text",
    extension: defaultBlockContent,
  },
});

store.dispatch({
  type: ActionType.INSERT_BLOCK_AFTER,
  payload: {
    id: null,
    type: "code",
    extension: defaultBlockContent,
  },
});

store.dispatch({
  type: ActionType.INSERT_BLOCK_AFTER,
  payload: {
    id: null,
    type: "text",
    extension: defaultBlockContent,
  },
});