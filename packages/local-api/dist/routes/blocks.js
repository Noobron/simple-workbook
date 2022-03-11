"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlockRouter = void 0;
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const createBlockRouter = (filename, dir) => {
    const router = express_1.default.Router();
    router.use(express_1.default.json());
    const fullPath = path_1.default.join(dir, filename);
    // get the data from cells stored in file
    router.get("/blocks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // read the file
            const result = yield promises_1.default.readFile(fullPath, "utf-8");
            res.send(result);
        }
        catch (error) {
            if (error.code === "ENOENT") {
                // add code to create a file and add default blocks
                yield promises_1.default.writeFile(fullPath, "[]", "utf-8");
                res.send([]);
            }
            else {
                throw error;
            }
        }
    }));
    // update the file from the request body
    router.post("/blocks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { blocks } = req.body;
        // write data into the file
        yield promises_1.default.writeFile(fullPath, JSON.stringify(blocks), "utf-8");
        res.send({ status: "ok" });
    }));
    return router;
};
exports.createBlockRouter = createBlockRouter;
