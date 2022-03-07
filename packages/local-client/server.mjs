// HTML File povider for the Iframe object

import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ silent: true });

const app = express();

app.use(cors());
app.options("*", cors());
app.use(json({ limit: process.env.REQUEST_SIZE_LIMIT }));
app.use(
  urlencoded({
    extended: true,
    limit: process.env.REQUEST_SIZE_LIMIT,
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

app.listen(process.env.REACT_APP_HTML_FILE_SERVER_PORT);
