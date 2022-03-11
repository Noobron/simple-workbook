import axios from "axios";
import { Dispatch } from "redux";
import { EditorLanguages, RootState } from "..";
import { ActionType } from "../action-types";
import {
  Action,
  BlockDirectionType,
  DeleteBlockAction,
  InsertBlockAfterAction,
  MoveBlockAction,
  UpdateBlockAction,
} from "../actions";
import {
  Block,
  BlockContentType,
  BlockType,
  defaultBlockContent,
} from "../block";

export const updateBlock = (
  id: string,
  input: string,
  language: EditorLanguages = -1
): UpdateBlockAction => {
  return {
    type: ActionType.UPDATE_BLOCK,
    payload: {
      id: id,
      input: input,
      language: language,
    },
  };
};

export const deleteBlock = (id: string): DeleteBlockAction => {
  return {
    type: ActionType.DELETE_BLOCK,
    payload: {
      id: id,
    },
  };
};

export const moveBlock = (
  id: string,
  direction: BlockDirectionType
): MoveBlockAction => {
  return {
    type: ActionType.MOVE_BLOCK,
    payload: {
      id: id,
      direction: direction,
    },
  };
};

export const insertBlockAfter = (
  id: string | null,
  type: BlockType,
  extension: BlockContentType | undefined = undefined,
  bindTo: string | undefined = undefined
): InsertBlockAfterAction => {
  return {
    type: ActionType.INSERT_BLOCK_AFTER,
    payload: {
      id: id,
      type: type,
      extension: extension ? extension : defaultBlockContent,
      bindTo: bindTo,
    },
  };
};

export const fetchBlocks = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_BLOCKS });

    try {
      const { data }: { data: Block[] } = await axios.get("/blocks");

      dispatch({
        type: ActionType.FETCH_BLOCK_COMPLETE,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.FETCH_BLOCKS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const saveBlocks = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      blocks: { data, order },
    } = getState();

    const blocks = order.map((id) => data[id]);

    try {
      await axios.post("/blocks", { blocks });
    } catch (error: any) {
      dispatch({
        type: ActionType.SAVE_BLOCKS_ERROR,
        payload: error.message,
      });
    }
  };
};
