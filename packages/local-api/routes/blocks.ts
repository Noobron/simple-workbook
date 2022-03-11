import express from "express";
import fs from "fs/promises";
import path from "path";

export type BlockType = "code" | "text";

export type BlockContentType = {
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

export const createBlockRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  // get the data from cells stored in file
  router.get("/blocks", async (req, res) => {
    try {
      // read the file
      const result = await fs.readFile(fullPath, "utf-8");
      res.send(result);
    } catch (error: any) {
      if (error.code === "ENOENT") {
        // add code to create a file and add default blocks
        await fs.writeFile(fullPath, "[]", "utf-8");

        res.send([]);
      } else {
        throw error;
      }
    }
  });

  // update the file from the request body
  router.post("/blocks", async (req, res) => {
    const { blocks }: { blocks: Block[] } = req.body;

    // write data into the file
    await fs.writeFile(fullPath, JSON.stringify(blocks), "utf-8");

    res.send({ status: "ok" });
  });

  return router;
};
