export interface IHttpRequest<
  Body = unknown,
  Params = unknown,
  Query = unknown,
  Headers = unknown,
> {
  body: Body;
  params: Params;
  query: Query;
  headers: Headers;
}
