/*
  APA -- 单页面应用 
  在应用只有一个页面，功能简单时使用，可以减少代码大小
*/
import { render } from 'solid-js/web';
import App from '../pages/demo';

render(() => <App />, document.getElementById('root')!);
