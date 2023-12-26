import { AJAX } from '../utils/ajax';

export const testFetch = () => AJAX.Post('/voice_change/h5/voice', { h5_code: 'xxx' }, {});
