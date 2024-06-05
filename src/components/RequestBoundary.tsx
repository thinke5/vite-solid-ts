import type { Component, JSXElement, Resource, ResourceActions, ResourceFetcher, ResourceOptions, ResourceSource } from 'solid-js'
import { ErrorBoundary, Show, Suspense, createEffect, createResource, onMount } from 'solid-js'
import { loading as iconLoading } from '@thinke/toast/icons'
import { Dynamic } from 'solid-js/web'

export interface RequestBoundaryProps {

}
/** 请求边界，可自动处理请求的loading、error、reset */
export default function RequestBoundary<T, R, S = any>(props: {
  errorUI?: Component<ErrorUIProps>
  loadingUI?: Component
  request: ResourceFetcher<true, T, R> | [ResourceFetcher<true, T, R>] | [ ResourceSource<S>, ResourceFetcher<S, T, R> ] | [ ResourceSource<S>, ResourceFetcher<S, T, R>, ResourceOptions<NoInfer<T>, S>]
  children: (data: Ready<T>, actons: ResourceActions<T, R>) => JSXElement
}): JSXElement {
  const [data, actons] = createResource(
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    ...(Array.isArray(props.request) ? props.request : [props.request]),
  )

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
      <Suspense fallback={<Dynamic component={props.loadingUI ?? MaskLoadingOnlyUI} />}>
        <Show when={data.latest}>
          {props.children(data as any, actons as any)}
        </Show>
      </Suspense>
    </ErrorBoundary>
  )
}

// #region 遮罩的加载中UI
/** 遮罩的加载中UI */
export function MaskLoadingOnlyUI() {
  let $div: HTMLDivElement | null
  onMount(() => {
    if ($div) {
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
    <div class="fixed z-98 f-c/c bg-gray/15 text-blue" ref={$div!}>
      {SvgString2Element(iconLoading)}
    </div>
  )
};
// #endregion

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
        <div class="fixed z-98 f-c/c bg-gray/5 text-blue" ref={$div!}>
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
  onMount(() => {
    if (import.meta.env.DEV)
      console.error(props.error)
  })
  return (
    <div class="s-full f-c/c flex-col rd-.5em bg-red-1/40">
      <span class="text-.8em">发生错误！</span>
      <button onClick={props.reset} class="mt-.75em cursor-pointer rd-2 b-none bg-blue-2 px-2em py.5em">重试</button>
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
