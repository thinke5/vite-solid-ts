import { A } from '@solidjs/router'
import type { JSXElement } from 'solid-js'

export interface LayoutProps {
  children?: JSXElement
}
/**  */
export default function Layout(props: LayoutProps) {
  return (
    <div class="min-h-100vh bg-light-2">
      <div class="flex-c/c gap-x-20 bg-dark py-24">
        <A href="" activeClass="text-blue" inactiveClass="text-white" end class="px-32 py-16">Home</A>
        <A href="/spa/data" activeClass="text-blue" inactiveClass="text-white" end class="px-32 py-16">Fetch</A>
        <A href="/spa/rd" activeClass="text-blue" inactiveClass="text-white" end class="px-32 py-16">RouterFetch</A>
      </div>
      <main>{props.children}</main>
    </div>
  )
};
