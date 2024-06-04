import { createSignal } from 'solid-js'
import RequestBoundary from '../../components/RequestBoundary'
import { api404, apiTest, bingBgByGet } from '../../request/test'

/** demo页面 */
export default function Demo() {
  const [count, setCount] = createSignal(0)
  return (
    <div class="f-c/s flex-col p-24">
      <img class="s-200" src="/vite.svg" />
      <h1>vite + solid</h1>
      <p>
        conut=
        {count()}
      </p>
      <button class="px-20 py-10" onClick={() => setCount(c => c + 1)}>count + 1</button>
      <hr />
      <div class="h-500 w-full overflow-auto">
        <RequestBoundary request={bingBgByGet}>
          {(data, actons) => {
            return (
              <div class="p-16">
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

    </div>
  )
}
