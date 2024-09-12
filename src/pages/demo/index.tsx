import { A } from '@solidjs/router'
import { createQuery } from '@tanstack/solid-query'
import { createSignal, Show, Suspense } from 'solid-js'
import { bilibiliweekly } from '~/request/test'

/** demo页面 */
export default function Demo() {
  const [count, setCount] = createSignal(1)
  // const [data, action] = createResource(bilibiliweekly)
  const query = createQuery(() => ({
    queryKey: ['bilibiliweekly'],
    queryFn: bilibiliweekly,

  }))

  return (
    <div class="f-c/s flex-col p-24px">
      <img class="s-20" src="/vite.svg" />
      <h1 class="m-0">vite + solid + SSG</h1>
      <div class="">
        <button class="px-20px py-10px" onClick={() => setCount(c => c + 1)}>
          conut = {count()}
        </button>

      </div>

      <div class="flex gap-8">
        <A href="/demo">demo</A>
        <A href="/demo2">demo2</A>
        <A href="/devSetting">devSetting</A>
      </div>
      {/* 请求模拟 */}
      <div class="">
        <button onClick={() => query.refetch()}>refetch</button>
        <Show when={query.isRefetching}>
          <p class="">刷新中</p>
        </Show>

        <Suspense fallback={<p class="text-blue">加载中</p>}>
          <pre class="h-100 w-52 overflow-auto bg-gray-1 text-2 leading-none">{JSON.stringify(query.data, null, 1)}</pre>
        </Suspense>

      </div>
    </div>
  )
}
function sleeptest(time = 0) {
  console.log(' sleep ', time)

  return new Promise<number>(resolve => setTimeout(() => resolve(time), time))
}
