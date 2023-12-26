import { cache } from '@solidjs/router';

export type Idata = {
  name: string;
  time: string;
};

export const getData = cache(async () => {
  return await Data();
}, 'getData');

export const Data = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('get data ok');

  return {
    name: 'dataName',
    time: new Date().toLocaleString(),
  } as Idata;
};
