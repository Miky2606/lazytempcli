#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const download_1 = require("./controller/download");
const upload_1 = require("./controller/upload");
const { Command } = require("commander");
const program = new Command();
program
    .name("CLI LazyTemp")
    .description("CLI for LazyTemp")
    .version("0.8.0")
    .option("--u,--upload <char>", "Upload template")
    .option("--d,--download <char>", "Download Template")
    .option("--n, --name <char>", "Enter name")
    .action((options) => {
    if (options.upload !== undefined && options.name !== undefined)
        return (0, upload_1.upload)({ name: options.upload, name_folder: options.name });
    if (options.download !== undefined && options.name !== undefined)
        return (0, download_1.download)({ name: options.download, name_folder: options.name });
    return console.log("Error, all fileds require a name");
});
program.parse();
