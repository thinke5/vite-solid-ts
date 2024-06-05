import { createSignal } from 'solid-js'
import RequestBoundary from '../../components/RequestBoundary'
import { api404, apiTest, bingBgByGet } from '../../request/test'

/** demo页面 */
export default function Demo() {
  const [count, setCount] = createSignal(0)
  return (
    <div class="f-c/s flex-col p-24px">
      <img class="s-200px" src="/vite.svg" />
      <h1>vite + solid</h1>
      <p>
        conut=
        {count()}
      </p>
      <button class="px-20px py-10px" onClick={() => setCount(c => c + 1)}>count + 1</button>
      <hr />
      <div class="h-500px w-full overflow-auto">
        <RequestBoundary request={bingBgByGet}>
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

    </div>
  )
}
