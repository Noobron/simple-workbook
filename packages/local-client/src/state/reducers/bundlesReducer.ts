import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface BundleState {
  [id: string]: {
    loading: boolean;
  };
}

const initialState: BundleState = {};

const bundlesReducer = produce((state: BundleState, action: Action) => {
  switch (action.type) {
    // start bundling process
    case ActionType.BUNDLE_START:
      state[action.payload.id] = {
        loading: true,
      };
      return state;

    // bundling process complete
    case ActionType.BUNDLE_COMPLETE:
      state[action.payload.id] = {
        loading: false,
      };
      return state;

    default:
      return state;
  }
}, initialState);

export default bundlesReducer;
