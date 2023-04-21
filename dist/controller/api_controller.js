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
exports.upload_temp = exports.get_user_by_id = exports.get_template = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + "/.env" });
const route = (e) => `${process.env.API_URL}/${e}`;
const get_template = ({ name }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield axios_1.default.get(route(`template/${name}`));
        if (data.data.error !== undefined)
            return data.data;
        return { user: data.data.success.user, id: data.data.success.id };
    }
    catch (error) {
        throw "Error in api " + error;
    }
});
exports.get_template = get_template;
const get_user_by_id = ({ name }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield axios_1.default.get(route(`user/user-id/${name}`));
        if (data.data.error !== undefined)
            throw data.data.error;
        return data.data.success;
    }
    catch (error) {
        throw new Error("Error in api " + error);
    }
});
exports.get_user_by_id = get_user_by_id;
const upload_temp = ({ temp }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield axios_1.default.post(route(`template`), {
            temp,
        });
        if (data.data.error)
            return data.data.error;
        return data.data.success;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.upload_temp = upload_temp;
