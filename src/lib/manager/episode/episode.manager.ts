import { EpisodeModel } from "@/lib/models/episode/episode.model";
import { ApiClient } from "../../api-client";

export class EpisodeManager {
  public constructor(private apiClient: ApiClient) {}

  public async getMultipleEpisode(params: string[]): Promise<EpisodeModel[]> {
    const url = `/episode/${params}`;
    return this.apiClient.get<EpisodeModel[]>(url).then((response) => response.data);
  }
}
