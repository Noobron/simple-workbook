"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const serve = (port, filename, dir) => {
    console.log("Serving on port:", port);
    console.log("Working directory:", `\x1b[33m${dir}\x1b[0m`);
    console.log("Saving changes in file:", `\x1b[33m${filename}\x1b[0m`);
};
exports.serve = serve;
