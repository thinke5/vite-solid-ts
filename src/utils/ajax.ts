import { getAuthParam } from '@tencent/tmga-h5-sdk';
import axios, { AxiosRequestConfig, isAxiosError } from 'axios';
import { encode } from 'js-base64';
import { isObject, isNil } from 'lodash';
import { BASEURL } from '../config';

const iaxios = axios.create({
  baseURL: BASEURL,
});
// 添加 公共请求参数
iaxios.interceptors.request.use(async (reqConfig) => {
  const authParam = await getAuthParam();
  if (typeof reqConfig.data === 'object') {
    reqConfig.data = { ...authParam.bodyParam, ...reqConfig.data };
  }
  reqConfig.headers['tencent-tmga-pvpdatawebsvr'] = encode(JSON.stringify(authParam.headerParam));
  return reqConfig;
});
// 优化 返回的数据
iaxios.interceptors.response.use(async (resInfo) => {
  const resData = resInfo.data;
  // data 为对象时，判断code
  if (isObject(resData)) {
    const code = objGetByKeys(resData, 'code', 'err_code', 'errcode', 'errCode');
    const data = objGetByKeys(resData, 'data', 'content') || resData;
    // 没有code，直接返回原数据
    if (code === undefined) return resData;
    // code 不为0，走错误处理
    if (code !== 0) throw resData;
    // 其他 直接返回 data
    return data;
  }
  // data 未定义时，返回原始数据
  if (resData !== undefined) return resInfo;
  // 其他 返回 data
  return resData;
});
// 错误处理
iaxios.interceptors.response.use(undefined, async (err) => {
  if (isAxiosError(err)) {
    // http 错误，或axios的错误
    const message = err.response?.statusText || err.message;
    const code = err.response?.status ?? -1;
    throw createIError(code, message, err);
  } else if (!isNil(err.code)) {
    // 后台返回的错误
    throw createIError(err.code, err.message, err);
  }
  // 继续向外抛出错误
  throw err;
});
// 错误自动弹窗 -- 自定义
// iaxios.interceptors.response.use(undefined, async (err) => {
//   if (err.code > 0) {
//     alert(`${err.message}【${err.code}】`);
//   }
//   // 继续向外抛出错误
//   throw err;
// });

/** 取出 对象中第一个 != undefined 的值 */
function objGetByKeys(obj: { [key: string]: any }, ...keys: string[]) {
  for (let key of keys) {
    if (obj[key] !== undefined) return obj[key];
  }
}

function createIError(code: number, message: string, cause: any) {
  const err = new Error(message);
  err.name = `Axios Error:${code}`;
  // @ts-ignore
  err.code = code;
  // @ts-ignore
  err.cause = cause;
  return err;
}

export const POST: IPOST = (...args) => iaxios.post(...args);
export const GET: IGet = (...args) => iaxios.get(...args);

type IPOST = <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) => Promise<T>;
type IGet = <T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) => Promise<T>;
