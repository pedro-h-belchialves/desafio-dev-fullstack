export interface IControllerContract<T> {
  handle(request: any): Promise<HttpResponse<T>>;
}

export type HttpResponse<T> = {
  statusCode: number;
  body?: T | { message: string };
};
