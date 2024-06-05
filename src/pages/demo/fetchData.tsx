import { ErrorBoundary, Show, createResource } from 'solid-js'
import { Qrdecode, api404, bingBgByGet } from '../../request/test'
import JsonPre from '../../components/JsonPre'

/** 请求demo */
export default function FetchData() {
  return (
    <div class="grid grid-cols-1 p-3">
      <p class="text-blue-6">bing 每日壁纸;预期为 GET http:200 code:200</p>
      <BingBg />

      <p class="text-blue-6">二维码解码;预期为 POST http:200 code:201</p>
      <QrDecode />

      <p class="text-blue-6"> POST http:404</p>
      <Api404 />
    </div>
  )
};

// #region 404
export function Api404() {
  const [data] = createResource(api404)

  return (
    <ErrorBoundary fallback={(
      <div>
        <span>error info :</span>
        <JsonPre data={data.error} />
      </div>
    )}
    >
      <Show when={!data.loading} fallback="loading">
        <div>
          <span>成功返回：</span>
          <JsonPre data={data()} />
        </div>
      </Show>
    </ErrorBoundary>
  )
}
// #endregion

// #region QrDecode
export function QrDecode() {
  const [data] = createResource(Qrdecode)

  return (
    <ErrorBoundary fallback={(
      <div>
        <span>error info :</span>
        <JsonPre data={data.error} />
      </div>
    )}
    >
      <Show when={!data.loading} fallback="loading">
        <div>
          <span>成功返回：</span>
          <JsonPre data={data()} />
        </div>
      </Show>
    </ErrorBoundary>
  )
}
// #endregion

// #region BingBg
export function BingBg() {
  const [data] = createResource(bingBgByGet)

  return (
    <ErrorBoundary fallback={(
      <div>
        <span>error info :</span>
        <JsonPre data={data.error} />
      </div>
    )}
    >
      <Show when={!data.loading} fallback="loading">
        <div>
          <span class="">成功返回：</span>
          <JsonPre data={data()} />
        </div>
      </Show>
    </ErrorBoundary>
  )
}
// #endregion
