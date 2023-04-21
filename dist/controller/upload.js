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
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const api_controller_1 = require("./api_controller");
const upload_1 = require("./aws/upload");
const fs_utils_1 = require("./fs_utils");
const upload = ({ name, name_folder }) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, id } = yield (0, api_controller_1.get_user_by_id)({ name });
    const template = yield (0, api_controller_1.get_template)({ name: name_folder });
    if (template.error === undefined)
        return console.log("template exist");
    const route = `${id}/${name_folder}`;
    const description = yield (0, fs_utils_1.get_description)(`${process.cwd()}/command.json`);
    yield (0, upload_1.uploadFolderToS3)(route, process.cwd(), name);
    let temp = {
        name: name_folder,
        downloads: 0,
        id: "",
        user: id,
        date: new Date(),
        description: description,
    };
    const upload = yield (0, api_controller_1.upload_temp)({ temp });
    if (upload.error)
        throw upload.error;
    return console.log("Success");
});
exports.upload = upload;
