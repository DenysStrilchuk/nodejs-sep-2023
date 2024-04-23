"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_error_1 = require("./api-error");
const fs_service_1 = require("./fs.service");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (res) => {
    res.send("hello world");
});
app.get("/users", async (res) => {
    try {
        const users = await (0, fs_service_1.reader)();
        res.json(users);
    }
    catch (e) {
        res.status(400).json(e.message);
    }
});
app.post("/users", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name.length > 15) {
            throw new api_error_1.ApiError("Name should not be longer than 15 characters", 400);
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            throw new api_error_1.ApiError("Invalid email", 400);
        }
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordPattern.test(password)) {
            throw new api_error_1.ApiError("Password must consist of at least 6 characters and contain at least one number", 400);
        }
        const users = await (0, fs_service_1.reader)();
        const newUser = {
            id: users[users.length - 1].id + 1,
            name,
            email,
            password,
        };
        users.push(newUser);
        await (0, fs_service_1.writer)(users);
        res.status(201).json(newUser);
    }
    catch (e) {
        res.status(400).json(e.message);
    }
});
app.get("/users/:userId", async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const users = await (0, fs_service_1.reader)();
        if (!Number.isInteger(userId) || userId <= 0) {
            throw new api_error_1.ApiError("Invalid user ID", 400);
        }
        const user = users.find((user) => user.id === userId);
        if (!user) {
            throw new api_error_1.ApiError("User  not found", 404);
        }
        res.json(user);
    }
    catch (e) {
        res.status(400).json(e.message);
    }
});
app.put("/users/:userId", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name.length > 15) {
            throw new api_error_1.ApiError("Name should not be longer than 15 characters", 400);
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            throw new api_error_1.ApiError("Invalid email", 400);
        }
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordPattern.test(password)) {
            throw new api_error_1.ApiError("Password must consist of at least 6 characters and contain at least one number", 400);
        }
        const userId = Number(req.params.userId);
        const users = await (0, fs_service_1.reader)();
        const index = users.findIndex((user) => user.id === userId);
        if (index === -1) {
            throw new api_error_1.ApiError("User  not found", 400);
        }
        users[index] = { ...users[index], name, email, password };
        await (0, fs_service_1.writer)(users);
        res.status(201).json(users[index]);
    }
    catch (e) {
        res.status(400).json(e.message);
    }
});
app.delete("/users/:userId", async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const users = await (0, fs_service_1.reader)();
        const index = users.findIndex((user) => user.id === userId);
        if (index === -1) {
            throw new api_error_1.ApiError("User  not found", 400);
        }
        users.splice(index, 1);
        await (0, fs_service_1.writer)(users);
        res.sendStatus(204);
    }
    catch (e) {
        res.status(400).json(e.message);
    }
});
const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`server is running at http://0.0.0.0:${PORT}/`);
});
