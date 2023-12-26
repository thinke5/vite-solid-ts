import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import { onCleanup, createSignal, createEffect } from 'solid-js';
import { BASEURL } from '../config';

//  创建alova实例
export const AJAX = createAlova({
  baseURL: BASEURL,
  statesHook: {
    create: (data) => createSignal(data),
    export: (states) => states[0],
    dehydrate: (state: any) => state(),
    update: (newVal, states) => {
      Object.keys(newVal).forEach((key) => {
        states[key][1](newVal[key]);
      });
    },
    effectRequest({ handler, removeStates, immediate, watchingStates }) {
      onCleanup(removeStates);

      immediate && handler();

      let timer: any;
      (watchingStates || []).forEach((state, i) => {
        createEffect(() => {
          state();
          timer && clearTimeout(timer);
          timer = setTimeout(() => {
            handler(i);
            clearTimeout(timer);
            timer = undefined;
          }, 8);
        });
      });
    },
  },

  // 请求适配器，推荐使用fetch请求适配器
  requestAdapter: GlobalFetch(),

  // 全局的响应拦截器
  responded: (response) => response.json(),
});
