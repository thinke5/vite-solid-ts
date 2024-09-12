import { useNavigate } from '@solidjs/router'
import { For, Show } from 'solid-js'
import { produce } from 'solid-js/store'
import { appDevConfig, appDevConfigLSKey, setAppDevConfig } from '~/libs/appDevConfig'

/**  */
export default function DevSetting() {
  const navigate = useNavigate()

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
      desc: '网络请求调试工具',
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
    {
      title: '模拟其他用户',
      desc: '模拟其他用户',
      value: appDevConfig.mockAuthParam.enable,
      onClick: () => {
        setAppDevConfig(produce((dort) => {
          dort.mockAuthParam.enable = !dort.mockAuthParam.enable
        }))
      },
      children: (
        <div
          class="w-full flex flex-col px-3"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <span class="text-xs text-gray-5">请输入json字符串以覆盖body中的通用参数</span>
          <textarea
            placeholder="请输入json字符串"
            value={JSON.stringify(appDevConfig.mockAuthParam.value)}
            onInput={(v) => {
              try {
                const res = JSON.parse(v.target.value)
                setAppDevConfig(produce((dort) => {
                  dort.mockAuthParam.value = res
                }))
              }
              // eslint-disable-next-line unused-imports/no-unused-vars
              catch (_e) {}
            }}
          />
        </div>
      ),
    },
  ]
  return (
    <div class="min-h-dvh bg-blueGray-2 py-1">
      <p class="mb-0 mt-12 text-center text-xl font-bold">调试开关</p>
      <p class="my-0 text-center text-sm text-red">重新加载页面后生效</p>

      <div class="my-3 f-c/c gap-6">
        <button
          class="rd-2 b-none bg-orange-1 px-6 py-2"
          onClick={() => navigate(-1)}
        >
          返回上一页
        </button>
        <button
          class="rd-2 b-none bg-blue-2 px-8 py-3"
          onClick={() => location.reload()}
        >刷新页面
        </button>
        <button
          class="rd-2 b-none bg-red-3 px-4 py-2"
          onClick={() => {
            localStorage.removeItem(appDevConfigLSKey)
            location.reload()
          }}
        >
          重置设置
        </button>
      </div>

      <p class="px-3 text-xs text-orange leading-tight">下面开关会影响页面，开关之间可能会互相影响<br />请咨询开发者后打开。 </p>

      <div class="bg-light">
        <For each={list()}>{item => (
          <div class="leading-tight shadow-sm" onClick={item.onClick}>
            <div class="f-c/sb px-4 py-2">
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
            <Show when={item.value}>{item.children}</Show>
          </div>
        )}
        </For>
      </div>

    </div>
  )
};
