import { combineReducers } from "redux";
import blocksReducer from "./blocksReducer";
import bundlesReducer from "./bundlesReducer";

const rootReducer = combineReducers({
  blocks: blocksReducer,
  bundles: bundlesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
