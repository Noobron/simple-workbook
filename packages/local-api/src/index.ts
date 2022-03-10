import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import dotenv from "dotenv";
import { createBlockRouter } from "../routes/blocks";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  console.log("Working directory:", `\x1b[33m${dir}\x1b[0m`);
  console.log("Saving changes in file:", `\x1b[33m${filename}\x1b[0m`);

  const app = express();

  if (useProxy) {
    const envPath = require.resolve("local-client/.env");
    dotenv.config({ path: envPath });

    app.use(
      createProxyMiddleware({
        target: `http://localhost:${process.env.PORT}`,
        ws: true,
        logLevel: "silent",
      })
    );
  } else {
    const packagePath = require.resolve("local-client/build/index.html");

    app.use(express.static(path.dirname(packagePath)));
  }

  app.use(createBlockRouter(filename, dir));

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
