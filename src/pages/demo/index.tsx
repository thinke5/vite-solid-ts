import { createSignal } from 'solid-js';
import solidLogo from '../../assets/solid.svg';
import viteLogo from '/vite.svg';
import './App.less';

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="app">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class="logo solid" alt="Solid logo" />
        </a>
      </div>

      <h1 class="text-(32 #111)">Vite + Solid + TS</h1>
      <div class="card flex gap-2">
        <button onClick={() => setCount((count) => count + 1)}>count is {count()}</button>
      </div>
    </div>
  );
}

export default App;
