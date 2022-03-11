import produce from "immer";
import { generateRandomId } from "../../utils/utils";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Block, EditorLanguages } from "../block";

export interface BlocksState {
  loading: boolean;
  order: string[];
  error: string | null;
  data: {
    [id: string]: Block;
  };
}

const initialState: BlocksState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const blocksReducer = produce(
  (state: BlocksState, action: Action): BlocksState => {
    switch (action.type) {
      // move a block
      case ActionType.MOVE_BLOCK:
        const index = state.order.findIndex((id) => id === action.payload.id);

        if (index !== -1) {
          const targetIndex =
            action.payload.direction === "up" ? index - 1 : index + 1;

          if (targetIndex >= 0 && targetIndex < state.order.length) {
            state.order[index] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id;
          }
        }

        return state;

      // update contents of a block
      case ActionType.UPDATE_BLOCK:
        const { language, input, id } = action.payload;

        switch (language) {
          case EditorLanguages.javascript:
            state.data[id].content.javascript = input;
            break;

          case EditorLanguages.html:
            state.data[id].content.html = input;
            break;

          case EditorLanguages.css:
            state.data[id].content.css = input;
            break;

          default:
            state.data[id].content.text = input;
            break;
        }

        return state;

      // delete a block
      case ActionType.DELETE_BLOCK:
        delete state.data[action.payload.id];

        state.order = state.order.filter((id) => id !== action.payload.id);
        return state;

      // insert a new block before another
      case ActionType.INSERT_BLOCK_AFTER:
        const block: Block = {
          content: action.payload.extension,
          type: action.payload.type,
          id: generateRandomId(6),
          bindTo: action.payload.bindTo,
        };

        state.data[block.id] = block;

        const blockIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );

        if (blockIndex < 0) {
          state.order.unshift(block.id);
        } else {
          state.order.splice(blockIndex + 1, 0, block.id);
        }
        return state;

      // start fetching blocks from file
      case ActionType.FETCH_BLOCKS:
        state.loading = true;
        state.error = null;

        return state;

      // error while fetching blocks from file
      case ActionType.FETCH_BLOCKS_ERROR:
        state.loading = false;
        state.error = action.payload;

        return state;

      // fetching blocks from file complete
      case ActionType.FETCH_BLOCK_COMPLETE:
        state.order = action.payload.map((block) => block.id);

        state.data = action.payload.reduce((acc, block) => {
          acc[block.id] = block;
          return acc;
        }, {} as BlocksState["data"]);

        return state;

      // error while saving blocks to file
      case ActionType.SAVE_BLOCKS_ERROR:
        state.loading = false;
        state.error = action.payload;

        return state;

      default:
        return state;
    }
  },
  initialState
);

export default blocksReducer;
