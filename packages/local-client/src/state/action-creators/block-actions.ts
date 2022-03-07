import { EditorLanguages } from "..";
import { ActionType } from "../action-types";
import {
  BlockDirectionType,
  DeleteBlockAction,
  InsertBlockAfterAction,
  MoveBlockAction,
  UpdateBlockAction,
} from "../actions";
import { BlockContentType, BlockType, defaultBlockContent } from "../block";

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
