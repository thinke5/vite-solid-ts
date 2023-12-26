import { createAsync, useNavigate, useParams, useSearchParams } from '@solidjs/router';
import { useRequest } from 'alova';
import { Show, type Component } from 'solid-js';
import { BASEURL } from '../../config';
import { testFetch } from '../../request/test';
import { getData } from './getData';

export type DataProps = {};
/** 路由数据 组件 */
export const Data: Component<DataProps> = () => {
  const routeData = createAsync(() => getData());
  const [searchParams, setSearchParams] = useSearchParams();
  const param = useParams();
  const navigate = useNavigate();
  const { data, loading, send } = useRequest(testFetch);

  return (
    <div class="flex-1 bg-gray-1">
      <div class="w-full flex flex-wrap f-s/s gap-12 p-24">
        <div class="shadow-md b-#eee p-12 rd-6 min-w-300 min-h-200 bg-white">
          <p>routeData is</p>
          <Show when={routeData()} fallback={<span class="">loading...</span>}>
            <pre>{JSON.stringify(routeData(), null, 2)}</pre>
          </Show>
        </div>
        <div class="shadow-md b-#eee p-12 rd-6 min-w-300 min-h-200 bg-white">
          <button onclick={() => setSearchParams({ id: Number(searchParams.id || 0) + 1 })}>id +1</button>
          <p>searchParams is</p>
          <pre>{JSON.stringify(searchParams, null, 2)}</pre>
        </div>
        <div class="shadow-md b-#eee p-12 rd-6 min-w-300 min-h-200 bg-white">
          <button
            onclick={() => {
              if (param.id) {
                navigate('1');
              } else {
                navigate(`/spa/data/${(Number(param.num || 0) + 1).toString()}`);
              }
            }}>
            num +1
          </button>
          <p>Params is</p>
          <pre>{JSON.stringify(param, null, 2)}</pre>
        </div>
        <div class="shadow-md b-#eee p-12 rd-6 min-w-300 min-h-200 bg-white">
          <p>BASEURL = {BASEURL}</p>
        </div>
        <div class="shadow-md b-#eee p-12 rd-6 min-w-300 min-h-200 bg-white">
          <button onClick={[send, undefined]}>reload</button>
          <p>Fetch = </p>
          <pre>
            {JSON.stringify(
              {
                loading: loading(),
                data: data(),
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
};
export default Data;
