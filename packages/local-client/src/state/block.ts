export type BlockType = "code" | "text";

export enum EditorLanguages {
  javascript = 0,
  html = 1,
  css = 2,
}

export type BlockContentType = {
  javascript: string;
  html: string;
  css: string;

  text: string;
};

export interface BlockProps {
  blockId: string;
  content: BlockContentType;
  bindId?: string;
}

export const defaultBlockContent: BlockContentType = {
  html: "",
  css: "",
  javascript: "",

  text: "Click to edit",
};

export interface Block {
  id: string;
  type: BlockType;
  content: BlockContentType;
  bindTo?: string;
}

export interface CodeExtension {
  bindId?: string;
  content?: BlockContentType;
  contentId?: string;
}
