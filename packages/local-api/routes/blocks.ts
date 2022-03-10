import express from "express";

export const createBlockRouter = (filename: string, dir: string) => {
  const router = express.Router();

  // get the data from cells stored in file
  router.get("/blocks", async (req, res) => {});

  // update the file from the request body
  router.post("/blocks", async (req, res) => {});

  return router;
};
