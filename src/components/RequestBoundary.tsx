import type { Component, JSXElement, Resource, ResourceActions, ResourceFetcher } from 'solid-js'
import { ErrorBoundary, Show, createEffect, createResource } from 'solid-js'
import { loading as iconLoading } from '@thinke/toast/icons'
import { Dynamic } from 'solid-js/web'

export interface RequestBoundaryProps {

}
/** 请求边界，可自动处理请求的loading、error、reset */
export default function RequestBoundary<T, R>(props: {
  errorUI?: Component<ErrorUIProps>
  loadingUI?: Component<LoadingUIProps>
  request: ResourceFetcher<true, T, R>
  children: (data: Ready<T>, actons: ResourceActions<T, R>) => JSXElement
}): JSXElement {
  const [data, actons] = createResource(props.request)
  return (
    <ErrorBoundary fallback={(err, reset) => (
      <Dynamic
        component={props.errorUI ?? DefaultErrorUI}
        error={err}
        reset={(...args: any[]) => {
          actons.refetch(...args)
          reset()
        }}
      />
    )}
    >
      <Dynamic resource={data} component={props.loadingUI ?? MaskLoadingUI}>
        {props.children(data as any, actons as any)}
      </Dynamic>
    </ErrorBoundary>
  )
}

// #region 遮罩的加载中UI
/** 遮罩的加载中UI */
export function MaskLoadingUI(props: LoadingUIProps) {
  let $div: HTMLDivElement | null
  createEffect(() => {
    if (props.resource.loading && $div) {
      const pClientRect = $div.parentElement?.getBoundingClientRect()
      if (pClientRect) {
        $div.style.width = `${pClientRect.width}px`
        $div.style.height = `${pClientRect.height}px`
        $div.style.top = `${pClientRect.top}px`
        $div.style.left = `${pClientRect.left}px`
      }
    }
  })
  return (
    <>
      <Show when={props.resource.loading}>
        <div class="fixed z-98 f-c/c bg-gray/15 text-blue" ref={$div!}>
          {SvgString2Element(iconLoading)}
        </div>
      </Show>
      <Show when={props.resource()}>
        {props.children}
      </Show>
    </>
  )
};
// #endregion

// #region 默认的错误UI
/** 默认的错误UI */
export function DefaultErrorUI(props: ErrorUIProps) {
  return (
    <div class="s-full f-c/c flex-col rd-.5em bg-red-1/40">
      <span class="text-.8em">发生错误！</span>
      <button onClick={props.reset} class="mt-.75em cursor-pointer rd-4 b-none bg-blue-2 px-2em py.5em">重试</button>
    </div>
  )
};
// #endregion

interface ErrorUIProps { error: any, reset: () => void }
interface LoadingUIProps {
  resource: Resource<any>
  children: JSXElement
}

function SvgString2Element(svg: string) {
  let $div: any = document.createElement('div')
  $div.innerHTML = svg
  const svgElement = $div.firstChild
  $div = null
  return svgElement
}

interface Ready<T> {
  state: 'ready'
  loading: false
  error: undefined
  latest: T
  (): T
}
