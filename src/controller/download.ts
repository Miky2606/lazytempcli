import { get_template } from "./api_controller";
import { downloadFolderFromS3 } from "./aws/download";
import { get_json } from "./fs_utils";
import { Download_Upload } from "./interface";

export const download = async ({ name, name_folder }: Download_Upload) => {
  const template = await get_template({ name: name });

  if (template.error !== undefined) return console.log(template.error);

  const route = `${template.user.user}/${name}`;
  const root = `${process.cwd()}/${name_folder}`;
  const download = await downloadFolderFromS3(route, root);
  if (download === true) return await get_json(root, name_folder);
  return console.log("Error");
};
