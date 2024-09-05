import { useNavigate } from '@solidjs/router'
import { For, Show } from 'solid-js'
import { produce } from 'solid-js/store'
import { appDevConfig, setAppDevConfig } from '~/libs/appDevConfig'

/**  */
export default function DevSetting() {
  const nav = useNavigate()
  const list = () => [
    {
      title: 'vConsole',
      desc: 'H5本地调试工具',
      value: appDevConfig.vconsole,
      onClick: () => {
        setAppDevConfig({ vconsole: !appDevConfig.vconsole })
      },
    },
    {
      title: 'solidQueryDevtools',
      desc: 'solid-query Devtools',
      value: appDevConfig.solidQueryDevtools,
      onClick: () => {
        setAppDevConfig({ solidQueryDevtools: !appDevConfig.solidQueryDevtools })
      },
    },
    {
      title: 'pageSpy',
      desc: '远程调试工具 总开关',
      value: appDevConfig.pageSpy.enable,
      onClick: () => {
        setAppDevConfig(produce((dort) => {
          dort.pageSpy.enable = !dort.pageSpy.enable
        }))
      },
    },
    {
      title: 'pageSpy debugUI',
      desc: '在界面显示debug的按钮',
      value: appDevConfig.pageSpy.btn,
      onClick: () => {
        setAppDevConfig(produce((dort) => {
          dort.pageSpy.btn = !dort.pageSpy.btn
        }))
      },
    },
    {
      title: 'pageSpy offline',
      desc: '离线记录，不进行实时调试',
      value: appDevConfig.pageSpy.offline,
      onClick: () => {
        setAppDevConfig(produce((dort) => {
          dort.pageSpy.offline = !dort.pageSpy.offline
        }))
      },
    },
  ]
  return (
    <div class="min-h-dvh bg-blueGray-2 py-1">
      <p class="mb-0 mt-12 text-center text-xl font-bold">调试开关</p>
      <p class="my-0 text-center text-sm text-red">重新加载页面后生效</p>

      <div class="my-3 f-c/c gap-6">
        <button
          class="rd-2 b-none bg-orange-1 px-6 py-2"
          onClick={() => nav(-1)}
        >
          返回上一页
        </button>
        <button
          class="rd-2 b-none bg-blue-2 px-8 py-3"
          onClick={() => location.reload()}
        >刷新页面
        </button>

      </div>
      <p class="px-3 text-xs text-orange leading-tight">下面开关会影响页面，开关之间可能会互相影响<br />请咨询开发者后打开。 </p>
      <div class="bg-light">
        <For each={list()}>{item => (
          <div class="f-c/sb px-4 py-2 leading-tight shadow-sm" onClick={item.onClick}>
            <div class="flex flex-1 flex-col">
              <span class="text-base">{item.title}</span>
              <span class="text-sm text-gray-5">{item.desc}</span>
            </div>
            <div class="text-red">
              <Show when={item.value} fallback="关">
                <span class="text-green-6">开</span>
              </Show>
            </div>
          </div>
        )}
        </For>
      </div>

    </div>
  )
};
