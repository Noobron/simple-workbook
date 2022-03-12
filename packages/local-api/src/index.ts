import express, { json, urlencoded } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { createBlockRouter } from "../routes/blocks";

// express server for serving HTML files
export const fileServe = (port: number = 4006) => {
  // set default PORT for HTML file server as same as local-client

  const app = express();

  app.use(cors());
  app.use(json({ limit: "150mb" }));
  app.use(
    urlencoded({
      extended: true,
      limit: "150mb",
    })
  );

  app.post("/", function (req, res) {
    res.send(
      `<!DOCTYPE html>
<html lang="en" class="">

<head>

  <meta charset="UTF-8" />
  <meta name="robots" content="noindex" />

</head>

<body>
  <div id="root">
    <style>
      ${req.body["workbook-css"]}
    </style>

    ${req.body["workbook-html"]}
  </div>

  <script>
    const handleError = (err) => {
      document.body.innerHTML = '<div style="color: red;"> <h4>' + (err.name ? err.name : 'RuntimeError') + '</h4>' + err.message + '</div>';
      console.error(err);
    }

    // handle any uncaught errors
    window.addEventListener('error', (event) => {
      handleError(event);
    })

    try {
      eval(${req.body["workbook-js"]})
    }
    catch (err) {
      handleError(err);
    }
  </script>
</body>

</html>`
    );
  });

  console.log("Starting HTML file server...");

  app.listen(port);
};

// express server for handling file changes
export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  console.log("Working directory:", `\x1b[33m${dir}\x1b[0m`);
  console.log("Changes will be saved in file:", `\x1b[33m${filename}\x1b[0m`);

  const app = express();

  app.use(createBlockRouter(filename, dir));

  // run for dev env
  if (useProxy) {
    const envPath = require.resolve("@simple-workbook/local-client/.env");
    dotenv.config({ path: envPath });

    if (process.env.REACT_APP_HTML_FILE_SERVER_PORT) {
      fileServe(parseInt(process.env.REACT_APP_HTML_FILE_SERVER_PORT));
    } else {
      fileServe();
    }

    app.use(
      createProxyMiddleware({
        target: `http://localhost:${process.env.PORT}`,
        ws: true,
        logLevel: "silent",
      })
    );
  }
  // run for prod env
  else {
    const packagePath = require.resolve(
      "@simple-workbook/local-client/build/index.html"
    );

    fileServe();

    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
