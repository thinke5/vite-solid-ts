import { Suspense, createSignal, lazy } from 'solid-js'
import { A } from '@solidjs/router'
import RequestBoundary from '../../components/RequestBoundary'

const LC = lazy(() => import('./ssr'))
const LD = lazy(() => import('./did'))

/** demo页面 */
export default function Demo() {
  const [count, setCount] = createSignal(1)

  return (
    <div class="f-c/s flex-col p-24px">
      <img class="s-200px" src="/vite.svg" />
      <h1>vite + solid</h1>
      <p>
        conut=
        {count()}
      </p>
      <button class="px-20px py-10px" onClick={() => setCount(c => c + 1)}>count + 1</button>
      <A href="/styleTest">/styleTest</A>
      <hr />
      <div class="h-500px w-full overflow-auto">
        <RequestBoundary request={[() => count() * 1000, sleeptest]}>
          {(data, actons) => {
            return (
              <div class="p-2">
                <p>
                  loading =
                  {JSON.stringify(data.loading)}
                </p>
                <p>
                  data =
                  {JSON.stringify(data())}
                </p>
                <p>
                  data =
                  {JSON.stringify(data.latest)}
                </p>
                <button onClick={actons.refetch}>reload</button>
              </div>
            )
          }}
        </RequestBoundary>
      </div>
      <hr />
      <Suspense fallback={<span class="lc">LD_loading</span>}><LD /></Suspense>
      <hr />
      <Suspense fallback={<span class="lc">LC_loading</span>}><LC /></Suspense>
    </div>
  )
}
function sleeptest(time = 0) {
  console.log(' sleep ', time)

  return new Promise<number>(resolve => setTimeout(() => resolve(time), time))
}
