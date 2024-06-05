import { ErrorBoundary, Show } from 'solid-js'
import { createAsync } from '@solidjs/router'
import JsonPre from '../../components/JsonPre'
import { routerBing } from '../../request/test'

/** 切换路由的同时发起请求 */
export default function RouterFetch() {
  return (
    <div class="flex-c/s flex-col p-3">
      <p class="text-blue-6">bing 每日壁纸;预期为 GET http:200 code:200</p>
      <BingBg />
    </div>
  )
};
// #region BingBg
export function BingBg() {
  const data = createAsync(() => routerBing())

  return (
    <ErrorBoundary fallback={(
      <div>
        <span>error</span>
      </div>
    )}
    >
      <Show when={data()} fallback="loading">
        <div>
          <span class="">成功返回：</span>
          <JsonPre data={data()} />
        </div>
      </Show>
    </ErrorBoundary>
  )
}
// #endregion
