import { A, useLocation } from '@solidjs/router'
import { createSignal, onMount } from 'solid-js'

/** demo页面 */
export default function Demo() {
  const [count, setCount] = createSignal(0)
  const m = useLocation()
  onMount(() => {
    console.log('ssr render', m.pathname)
  })
  return (
    <div class="2 f-c/s flex-col p-24px">
      <A href="/">index</A>
      <p>
        conut =
        {count()}
      </p>
      <button
        class="px-20px py-10px"
        onClick={() => {
          console.log(count())

          setCount(c => c + 1)
        }}
      >count ssr + 1
      </button>

    </div>
  )
}
