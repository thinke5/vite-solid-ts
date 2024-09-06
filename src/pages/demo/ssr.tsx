import { A } from '@solidjs/router'
import { createSignal, onCleanup, onMount } from 'solid-js'
import { onReMount } from '~/libs/keepAlive'

/** demo页面 */
export default function Demo() {
  const [count, setCount] = createSignal(0)
  onMount(() => {
    console.log('demo mount')
  })
  onCleanup(() => {
    console.log('demo cleanup')
  })
  onReMount(() => {
    console.log('demo reMount')
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
