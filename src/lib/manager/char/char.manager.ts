import { ApiModel, QueryApiModel } from "@/lib/models/api.model";
import { CharModel } from "@/lib/models/char/char.model";
import { ApiClient } from "../../api-client";

export class CharManager {
  public constructor(private apiClient: ApiClient) {}

  public async getCharList(
    params?: QueryApiModel
  ): Promise<ApiModel<CharModel[]>> {
    const url = `/character`;
    return this.apiClient
      .get(url, { params })
      .then((response) => response.data);
  }

  public async getChar(charId: number): Promise<CharModel> {
    const url = `/character/${charId}`;
    return this.apiClient.get(url).then((response) => response.data);
  }

  public async getMultipleChar(params: string[]): Promise<CharModel[]> {
    const url = `/character/${params}`;
    return this.apiClient.get(url).then((response) => response.data);
  }
}
