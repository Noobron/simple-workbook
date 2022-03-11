export declare type BlockType = "code" | "text";
export declare type BlockContentType = {
    javascript: string;
    html: string;
    css: string;
    text: string;
};
export interface Block {
    id: string;
    type: BlockType;
    content: BlockContentType;
    bindTo?: string;
}
export declare const createBlockRouter: (filename: string, dir: string) => import("express-serve-static-core").Router;
