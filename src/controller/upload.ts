import { get_template, get_user_by_id, upload_temp } from "./api_controller";
import { uploadFolderToS3 } from "./aws/upload";
import { get_description, get_json } from "./fs_utils";
import { Download_Upload, IList } from "./interface";

export const upload = async ({ name, name_folder }: Download_Upload) => {
  const { user, id } = await get_user_by_id({ name });
  const template = await get_template({ name: name_folder });

  if (template.error === undefined) return console.log("template exist");
  const route = `${id}/${name_folder}`;
  const description = await get_description(`${process.cwd()}/command.json`);
  await uploadFolderToS3(route, process.cwd(), name);
  let temp: IList = {
    name: name_folder,
    downloads: 0,
    id: "",
    user: id,
    date: new Date(),
    description: description,
  };

  const upload = await upload_temp({ temp });
  if (upload.error) throw upload.error;

  return console.log("Success");
};
