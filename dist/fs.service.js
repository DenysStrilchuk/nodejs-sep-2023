"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writer = exports.reader = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const filePath = node_path_1.default.join(process.cwd(), "db.json");
const reader = async () => {
    const users = await promises_1.default.readFile(filePath, "utf-8");
    return JSON.parse(users);
};
exports.reader = reader;
const writer = async (users) => {
    await promises_1.default.writeFile(filePath, JSON.stringify(users));
};
exports.writer = writer;
