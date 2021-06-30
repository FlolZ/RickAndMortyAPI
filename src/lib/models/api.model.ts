import { CharGender, CharStatus } from "./char/char.model";
import { InfoModel } from "./info/info.model";

export interface ApiModel<T> {
  info: InfoModel;
  results: T[];
}

export interface QueryApiModel {
  name: string;
  status: CharStatus;
  species: string;
  type: string;
  gender: CharGender;
  page: number;
}
