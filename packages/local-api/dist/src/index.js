"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const blocks_1 = require("../routes/blocks");
const serve = (port, filename, dir, useProxy) => {
    console.log("Working directory:", `\x1b[33m${dir}\x1b[0m`);
    console.log("Changes will be saved in file:", `\x1b[33m${filename}\x1b[0m`);
    const app = (0, express_1.default)();
    app.use((0, blocks_1.createBlockRouter)(filename, dir));
    if (useProxy) {
        const envPath = require.resolve("local-client/.env");
        dotenv_1.default.config({ path: envPath });
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: `http://localhost:${process.env.PORT}`,
            ws: true,
            logLevel: "silent",
        }));
    }
    else {
        const packagePath = require.resolve("local-client/build/index.html");
        app.use(express_1.default.static(path_1.default.dirname(packagePath)));
    }
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on("error", reject);
    });
};
exports.serve = serve;
