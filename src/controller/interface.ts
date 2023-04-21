export interface Download_Upload {
  name: string;
  name_folder: string;
}

export interface IList {
  id: string;
  name: string;
  downloads: number;
  description: string;
  user: string;
  date: Date;
}

export interface Json<T, U> {
  command: Command<T, U>[];
  description: string;
}

export type Command<T, U> = {
  key: T;
  valueL: U;
};
