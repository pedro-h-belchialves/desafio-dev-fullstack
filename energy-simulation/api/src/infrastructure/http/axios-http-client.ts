import axios from "axios";
import { HttpClient } from "./http-client-interface";

export class AxiosHttpClient implements HttpClient {
  async post<T>(url: string, data: any, options?: any): Promise<T> {
    const response = await axios.post(url, data, options);
    return response.data;
  }
}
