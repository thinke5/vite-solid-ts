import { createSignal } from 'solid-js'

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
    </div>
  )
}
