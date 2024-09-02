import { createSignal } from 'solid-js'

/** demo页面 */
export default function Demo() {
  console.log('ssr render')

  const [count, setCount] = createSignal(0)
  return (
    <div class="2 f-c/s flex-col p-24px">
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
