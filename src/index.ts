#!/usr/bin/env node

import { download } from "./controller/download";
import { upload } from "./controller/upload";

const { Command } = require("commander");

const program = new Command();

program
  .name("CLI LazyTemp")
  .description("CLI for LazyTemp")
  .version("0.8.0")
  .option("--u,--upload <char>", "Upload template")
  .option("--d,--download <char>", "Download Template")
  .option("--n, --name <char>", "Enter name")
  .action((options: any) => {
    if (options.upload !== undefined && options.name !== undefined)
      return upload({ name: options.upload, name_folder: options.name });
    if (options.download !== undefined && options.name !== undefined)
      return download({ name: options.download, name_folder: options.name });
    return console.log("Error, all fileds require a name");
  });

program.parse();
