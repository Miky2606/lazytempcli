import fs from "fs";
import { execSync } from "child_process";

export const get_json = async (route: string, name: string) => {
  const command_route = `${route}/command.json`;
  try {
    const read = await fs.readFileSync(command_route, "utf-8");

    let get_json_text = JSON.parse(read.toString());
    get_json_text.command["cd"] = name;

    await fs.writeFileSync(command_route, JSON.stringify(get_json_text));
    let command = "";
    for (let key in get_json_text.command) {
      if (command === "") {
        command = `${key} ${get_json_text.command[key]}`;
      } else {
        command = `${command} && ${key} ${get_json_text.command[key]}`;
      }
    }
    const run = await runCommand(command);
    if (!run) process.exit(-1);
    process.exit(0);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const get_description = async (route: string) => {
  try {
    const json = await fs.readFileSync(route);
    const description = JSON.parse(json.toString());
    return description.description;
  } catch (error: any) {
    throw new Error("File command.json must be in the folder");
  }
};

const runCommand = async (command: string) => {
  try {
    await execSync(`${command}`, { stdio: "inherit" });
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
  return true;
};
