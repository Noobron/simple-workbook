import { Dispatch } from "redux";
import { saveBlocks } from "../action-creators";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { RootState } from "../reducers";

export const persistMiddleWare = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      if (
        [
          ActionType.MOVE_BLOCK,
          ActionType.UPDATE_BLOCK,
          ActionType.INSERT_BLOCK_AFTER,
          ActionType.DELETE_BLOCK,
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(() => {
          saveBlocks()(dispatch, getState);
        }, 250);
      }
    };
  };
};
