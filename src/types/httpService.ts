import {
  AxiosPromise,
  Canceler,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  Method
} from 'axios';

export interface HttpService extends AxiosPromise {
  cancel: Canceler;
}

export type HttpResponse = AxiosResponse;
export type HttpError = AxiosError;
export type HttpRequestConfig = AxiosRequestConfig;
export type HttpMethod = Method;

export enum HttpRequestMethods {
  Get = 'get',
  Delete = 'delete',
  Head = 'head',
  Options = 'options',
  Post = 'post',
  Put = 'put',
  Patch = 'patch'
}
