import axios, { CancelTokenSource } from 'axios';

import { apiInstance } from 'api/setup';
import { HttpService, HttpRequestConfig } from 'types/httpService';

export const isHttpCallCanceled: (value: any) => boolean = axios.isCancel;

export const httpService = (params: HttpRequestConfig): HttpService => {
  const {
    token: cancelToken,
    cancel
  }: CancelTokenSource = axios.CancelToken.source();

  const request = apiInstance({
    ...params,
    cancelToken
  }) as HttpService;

  request.cancel = (): void => cancel();

  return request;
};
