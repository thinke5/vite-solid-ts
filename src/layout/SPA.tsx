/*
  SPA -- 多页面模式 
  相比单页面模式，多页面多了`@solidjs/router`，增加10～20Kb的js体积
*/
import { HashRouter, Navigate, RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';
import { render } from 'solid-js/web';
import { getData } from '../pages/spa/getData';
import Page404 from './404';

const routes: RouteDefinition[] = [
  {
    path: '/',
    component: () => <Navigate href="/spa" />,
  },
  {
    path: '/spa',
    component: lazy(() => import('../pages/spa')),
    children: [
      {
        path: '/',
        component: lazy(() => import('../pages/demo')),
      },
      {
        path: ['/data', '/data/:num'],
        component: lazy(() => import('../pages/spa/data')),
        load: getData,
      },
    ],
  },
  {
    path: '/demo',
    component: lazy(() => import('../pages/demo')),
  },
  {
    path: '*any',
    component: Page404,
  },
];
render(() => <HashRouter>{routes}</HashRouter>, document.getElementById('root')!);
