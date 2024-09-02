/**
 * 休眠一定时间
 * @param time 休眠时间，单位ms @default 0
 */
export function nextTick(time = 0) {
  return new Promise(resolve => setTimeout(resolve, time))
}
