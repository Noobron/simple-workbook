export enum ActionType {
  // Action types for blocks
  MOVE_BLOCK = "move_block",
  DELETE_BLOCK = "delete_block",
  INSERT_BLOCK_AFTER = "inser_block_after",
  UPDATE_BLOCK = "update_block",

  // Action types for bundling process
  BUNDLE_START = "bundle_start",
  BUNDLE_COMPLETE = "bundle_complete",

  // Actions types for fetching blocks
  FETCH_BLOCKS = "fetch_blocks",
  FETCH_BLOCK_COMPLETE = "fetch_blocks_complete",
  FETCH_BLOCKS_ERROR = "fetch_blocks_error",

  // Action types for saving blocks
  SAVE_BLOCKS_ERROR = 'saving_blocks_error'
}
