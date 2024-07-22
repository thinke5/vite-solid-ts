// https://github.com/JulianSoto/solid-keep-alive
import type { Accessor, JSX, Owner, ParentProps } from 'solid-js'
import { createContext, createEffect, createMemo, createRoot, createSignal, getOwner, onCleanup, runWithOwner, useContext } from 'solid-js'

export interface KeepAliveElement {
  id: string
  owner: Owner | null
  children: JSX.Element
  dispose: () => void
}

export type Store = [
  Accessor<KeepAliveElement[]>,
  {
    insertElement: (element: KeepAliveElement) => KeepAliveElement | undefined
    prioritizeElement: (id: string) => void
    removeElement: (id: string) => void
  },
]

const KeepAliveContext = createContext<Store>([
  () => [],
  {
    insertElement: () => undefined,
    prioritizeElement: () => void 0,
    removeElement: () => void 0,
  },
])

export function KeepAliveProvider(props: ParentProps<{ maxElements?: number }>) {
  const [keepAliveElements, setKeepAliveElements] = createSignal<KeepAliveElement[]>([])

  let priorityIndex: string[] = []

  createEffect<KeepAliveElement[]>((prev) => {
    const elements = keepAliveElements()
    const addedElement = elements.filter(el => !prev.includes(el))[0]
    const removedElement = prev.filter(el => !elements.includes(el))[0]

    if (addedElement)
      priorityIndex.push(addedElement.id)
    if (removedElement)
      priorityIndex = priorityIndex.filter(el => el !== removedElement.id)

    return elements
  }, keepAliveElements())

  const prioritizeElement = (id: string) => {
    const newPriorityIndex = priorityIndex.filter(elId => elId !== id)
    if (newPriorityIndex.length === priorityIndex.length - 1) {
      priorityIndex = [...newPriorityIndex, id]
    }
  }

  const insertElement = (element: KeepAliveElement) => {
    setKeepAliveElements((prev) => {
      let newElements = [...prev, element]
      if (newElements.length > (props.maxElements || 10))
        newElements = newElements.filter(el => el.id !== priorityIndex[0])
      return newElements
    })
    return element
  }

  const removeElement = (id: string) => {
    const element = keepAliveElements().find(el => el.id === id)
    if (element) {
      element.dispose()
      setKeepAliveElements(prev => prev.filter(el => el.id !== element.id))
    }
  }

  const store: Store = [
    keepAliveElements,
    { insertElement, prioritizeElement, removeElement },
  ]

  return (
    <KeepAliveContext.Provider value={store}>
      {props.children}
    </KeepAliveContext.Provider>
  )
}

export function useKeepAlive() {
  return useContext(KeepAliveContext)
}

interface KeepAliveProps {
  id: string
  onDispose?: () => void
}

export function KeepAlive(props: ParentProps<KeepAliveProps>) {
  const [keepAliveElements, { insertElement, prioritizeElement }] = useKeepAlive()

  const currentElement = createMemo(() => keepAliveElements().find(el => el.id === props.id))

  if (!currentElement()) {
    createRoot((dispose) => {
      insertElement({ id: props.id, owner: getOwner(), children: props.children, dispose })
      onCleanup(() => props.onDispose?.())
    })
  }

  return (() => {
    const element = currentElement()
    if (element) {
      prioritizeElement(element.id)
    }
    if (element?.owner) {
      return runWithOwner(element.owner, () => element?.children)
    }
    return null
  }) as any
}
