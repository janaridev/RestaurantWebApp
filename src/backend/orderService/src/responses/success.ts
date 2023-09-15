export interface OkResponse<T> {
  isSuccess: true;
  statusCode: number;
  result: T;
}
