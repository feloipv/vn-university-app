export interface IApiErrorRes {
  statusCode: number;
  message: string;
  errors?: string[];
}

export interface IApiRes<T = unknown> {
  message: string;
  success?: boolean;
  data?: T;
}
