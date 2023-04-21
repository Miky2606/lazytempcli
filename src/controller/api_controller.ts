import axios from "axios";
import dotenv from "dotenv";
import { IList } from "./interface";

dotenv.config({ path: __dirname + "/.env" });

const route = (e: string) => `${process.env.API_URL}/${e}`;

export const get_template = async ({ name }: { name: string }) => {
  try {
    const data = await axios.get(route(`template/${name}`));

    if (data.data.error !== undefined) return data.data;
    return { user: data.data.success.user, id: data.data.success.id };
  } catch (error) {
    throw "Error in api " + error;
  }
};

export const get_user_by_id = async ({ name }: { name: string }) => {
  try {
    const data = await axios.get(route(`user/user-id/${name}`));

    if (data.data.error !== undefined) throw data.data.error;
    return data.data.success;
  } catch (error) {
    throw new Error("Error in api " + error);
  }
};

export const upload_temp = async ({ temp }: { temp: IList }) => {
  try {
    const data = await axios.post(route(`template`), {
      temp,
    });

    if (data.data.error) return data.data.error;
    return data.data.success;
  } catch (error) {
    throw new Error(error as string);
  }
};
