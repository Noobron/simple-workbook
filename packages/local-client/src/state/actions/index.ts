import { EditorLanguages } from "..";
import { ActionType } from "../action-types";
import { BlockContentType, BlockType } from "../block";

export type BlockDirectionType = "up" | "down";

export interface MoveBlockAction {
  type: ActionType.MOVE_BLOCK;
  payload: {
    id: string;
    direction: BlockDirectionType;
  };
}

export interface DeleteBlockAction {
  type: ActionType.DELETE_BLOCK;
  payload: { id: string };
}

export interface InsertBlockAfterAction {
  type: ActionType.INSERT_BLOCK_AFTER;
  payload: {
    id: string | null;
    type: BlockType;
    extension: BlockContentType;
    bindTo?: string;
  };
}

export interface UpdateBlockAction {
  type: ActionType.UPDATE_BLOCK;
  payload: {
    id: string;
    input: string;
    language: EditorLanguages;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    id: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    id: string;
  };
}

export type Action =
  | MoveBlockAction
  | DeleteBlockAction
  | InsertBlockAfterAction
  | UpdateBlockAction
  | BundleStartAction
  | BundleCompleteAction;
