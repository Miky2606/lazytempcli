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
exports.get_description = exports.get_json = void 0;
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const get_json = (route, name) => __awaiter(void 0, void 0, void 0, function* () {
    const command_route = `${route}/command.json`;
    try {
        const read = yield fs_1.default.readFileSync(command_route, "utf-8");
        let get_json_text = JSON.parse(read.toString());
        get_json_text.command["cd"] = name;
        yield fs_1.default.writeFileSync(command_route, JSON.stringify(get_json_text));
        let command = "";
        for (let key in get_json_text.command) {
            if (command === "") {
                command = `${key} ${get_json_text.command[key]}`;
            }
            else {
                command = `${command} && ${key} ${get_json_text.command[key]}`;
            }
        }
        const run = yield runCommand(command);
        if (!run)
            process.exit(-1);
        process.exit(0);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.get_json = get_json;
const get_description = (route) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const json = yield fs_1.default.readFileSync(route);
        const description = JSON.parse(json.toString());
        return description.description;
    }
    catch (error) {
        throw new Error("File command.json must be in the folder");
    }
});
exports.get_description = get_description;
const runCommand = (command) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, child_process_1.execSync)(`${command}`, { stdio: "inherit" });
    }
    catch (error) {
        console.log(error);
        process.exit(-1);
    }
    return true;
});
