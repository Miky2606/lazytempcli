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
exports.download = void 0;
const api_controller_1 = require("./api_controller");
const download_1 = require("./aws/download");
const fs_utils_1 = require("./fs_utils");
const download = ({ name, name_folder }) => __awaiter(void 0, void 0, void 0, function* () {
    const template = yield (0, api_controller_1.get_template)({ name: name });
    if (template.error !== undefined)
        return console.log(template.error);
    const route = `${template.user.user}/${name}`;
    const root = `${process.cwd()}/${name_folder}`;
    const download = yield (0, download_1.downloadFolderFromS3)(route, root);
    if (download === true)
        return yield (0, fs_utils_1.get_json)(root, name_folder);
    return console.log("Error");
});
exports.download = download;
