import { LocationModel } from "@/lib/models/location/location.model";
import { ApiClient } from "../../api-client";

export class LocationManager {
  public constructor(private apiClient: ApiClient) {}

  public async getLocation(url: string): Promise<LocationModel> {
    return this.apiClient.get(url).then((response) => response.data);
  }
}
