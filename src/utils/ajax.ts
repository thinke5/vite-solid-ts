import type { Input, Options } from 'ky'
import ky, { HTTPError } from 'ky'
import { error as toastError } from '@thinke/toast'
import { BASEURL } from '../config'

const myErrStatus = 499

/** 模拟 获取鉴权数据 */
function getAuthParam() {
  return Promise.resolve({
    openid: 'OPENID',
    token: 'TOKEN',
  })
}

const defKY = ky.create({
  prefixUrl: BASEURL,
  retry: { limit: 1 },
  // throwHttpErrors: true,
  hooks: {
    // 请求发出前
    beforeRequest: [async (request, options: Options) => {
      const authParam = await getAuthParam()
      // console.log('发送请求', { request, options })
      // 处理表单提交时，自动添加鉴权参数
      if (options.method === 'POST' && options.body instanceof FormData) {
        const formData = options.body!
        Object.entries(authParam).forEach(([key, value]) => {
          formData.append(key, value)
        })
        return new Request(request, { body: formData })
      }
      // 处理json
      if (options.method === 'POST' && options.json && options.json instanceof Object)
        return new Request(request, { body: JSON.stringify({ ...authParam, ...options.json }) })
      // 其他情况直接返回原始的request
      return request
    }],
    // 请求返回后
    afterResponse: [async (_request, _options, response) => {
      // console.log('收到响应', { _request, _options, response })

      if (response.status === 200 && (await response.clone().arrayBuffer()).byteLength > 0) {
        const resData = await response.clone().json()
        const code = objGetFirstKeyValue(resData, 'code', 'err_code', 'errcode', 'errCode')
        const data = objGetFirstKeyValue(resData, 'data', 'content')

        if (new Set([0, 200]).has(code)) { // 成功请求，直接返回数据
          return new Response(JSON.stringify(data), { status: code })
        }
        else { // 失败请求，包装成MyResponse对象
          const message = objGetFirstKeyValue(resData, 'msg', 'message')
          const traceId = objGetFirstKeyValue(resData, 'trace_id', 'traceId')
          return new MyResponse(response, { code, message, data, traceId })
        }
      }
    }],
    // 请求出错后
    beforeError: [
      error => new MyAjaxError(error.response, error.request, error.options),
      (_error) => { // 显示错误提示
        const error = _error as MyAjaxError
        const option = error.options as MyOptions
        if (option.showToast !== false)
          toastError(`${error.code} ${error.message}`, 3000)

        return error
      },
    ],
  },
})

/** 携带错误信息的请求 */
class MyResponse extends Response {
  constructor(response: Response, cause: MyResponseCause) {
    super(null, { ...response, status: myErrStatus })
    this.cause = cause
  }

  public cause
}

/** 自定义错误 */
class MyAjaxError extends HTTPError {
  constructor(response: Response, request: Request, options: Options) {
    super(response, request, options as any)
    if (response instanceof MyResponse) {
      this.code = response.cause.code || -1
      this.message = response.cause.message || `Unknown Error ${this.code}`
      this.name = 'AjaxServerError'
    }
    else {
      this.code = response.status != null ? response.status : -1
      this.message = response.statusText || `Unknown Error ${this.code}`
      this.name = 'AjaxHttpError'
    }
  }

  public code: string | number = -2
  public message: string = ''
}

/** 取出 对象中第一个 != undefined 的值 */
function objGetFirstKeyValue(obj: { [key: string]: any }, ...keys: string[]) {
  for (const key of keys) {
    if (obj[key] !== undefined)
      return obj[key]
  }
}

interface MyResponseCause {
  /** 错误码 */
  code: string | number
  /** 错误信息 */
  message: string
  /** 数据 */
  data: any
  /** 请求id,用于排查错误 */
  traceId?: string
}

interface MyOptions extends Options {
  /** 是否在请求错误时显示toast @default true */
  showToast?: boolean
}

/**
 * 发起POST请求
 *
 * Object=>`application/json` ; FormData=>`multipart/form-data`; URLSearchParams=>`application/x-www-form-urlencoded`
 */
export function POST(path: Input, data?: ReqJson | FormData | URLSearchParams, options?: MyOptions) {
  if (data instanceof FormData || data instanceof URLSearchParams)
    return defKY.post(path, { body: data, ...options })

  return defKY.post(path, { json: data, ...options })
}
/** 发起GET请求 */
export function GET(path: Input, data: ReqJson | URLSearchParams, options?: MyOptions) {
  return defKY.get(path, { searchParams: new URLSearchParams(data), ...options })
}

interface ReqJson { [key: string | number]: any }
