import { A } from '@solidjs/router';
import type { Component, JSX } from 'solid-js';

export const DataPage: Component<{
  children?: JSX.Element;
}> = (props) => {
  return (
    <div class="min-h-100vh f-c/s flex-col">
      <nav class="w-full f-c/c gap-24 bg-gray-7">
        <A href="" end class="py-20" activeClass="text-blue" inactiveClass="text-white">
          Home
        </A>
        <A href="data" class="py-20" activeClass="text-blue" inactiveClass="text-white">
          data
        </A>
      </nav>
      {props.children}
    </div>
  );
};
export default DataPage;
