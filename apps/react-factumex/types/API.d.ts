export interface IAPIStandardResponse<T> {
  // extra data
  Response: T;
}

export interface IAPIStandardListResponse<T> {
  start: number;
  count: number;
  total: number;
  data: T[];
}

export type IListAPIEntity<T> = IAPIStandardResponse<
  IAPIStandardListResponse<T>
>;
