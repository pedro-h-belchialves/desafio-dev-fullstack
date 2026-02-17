export interface HttpClient {
  post<T>(url: string, data: any, options?: any): Promise<T>;
}
