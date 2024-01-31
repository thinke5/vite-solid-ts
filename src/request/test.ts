import { POST } from '../utils/ajax';

export const testFetch = () => POST<iX>('/data.json', { h5_code: 'xxx' });
type iX = {
  num: 123;
  str: 'xxxx';
  arr: [123, 5443, 76];
  obj: {
    a: 1;
  };
  bol: true;
  nil: null;
};
