import { EpisodeModel } from "../episode/episode.model";
import { LocationModel } from "../location/location.model";
import { OriginModel } from "../origin/origin.model";

export interface CharModel {
  id: number;
  name: string;
  status: CharStatus;
  species: string;
  type: string;
  gender: CharGender;
  origin: OriginModel;
  location: LocationModel;
  image: string;
  episode: EpisodeModel[];
  url: string;
  created: string;
}

export type CharStatus = "Dead" | "Alive" | "Unknown";
export type CharGender = "Female" | "Male" | "Genderless" | "Unknown";
