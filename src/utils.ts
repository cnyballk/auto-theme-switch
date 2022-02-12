import { switchThemeByTime } from "./extension";

export function getNow():number {
  const time = new Date();
  return time.getHours() + time.getMinutes() / 60;
}

export function getHours(timeStr: string):number  {
  const time = timeStr.split(':');
  return +time[0] + +time[1] / 60;
}

let timer: NodeJS.Timeout;
export function scheduleEvery(hours: number) {
  const now = getNow();
  const diff = hours - now;
  clearTimeout(timer);
  timer = setTimeout(() => {
    switchThemeByTime();
  }, diff * 60 * 60 * 1000);
}
