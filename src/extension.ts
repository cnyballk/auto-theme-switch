'use strict';
import { workspace, ExtensionContext } from 'vscode';
import { config, getConfig, configActivate, configDeactivate } from './config';

let themeKey = 'workbench.colorTheme';
const userConfig = workspace.getConfiguration();

let timer: NodeJS.Timeout;
function scheduleEvery(hours: number) {
  const now = getNow();
  const diff = hours - now;
  clearTimeout(timer);
  timer = setTimeout(() => {
    switchThemeByTime();
  }, diff * 60 * 60 * 1000);
}
function getNow():number {
  const time = new Date();
  return time.getHours() + time.getMinutes() / 60;
}

function getHours(timeStr: string):number  {
  const time = timeStr.split(':');
  return +time[0] + +time[1] / 60;
}

function switchThemeByTime() {
  const hours = getNow();
  const lightTime = getHours(config.lightTime);
  const darkTime = getHours(config.darkTime);

  console.log(hours,lightTime,darkTime);
  if (lightTime <= hours && hours < darkTime) {
    userConfig.update(themeKey, config.lightTheme, true);
    scheduleEvery(darkTime);
  } else {
    userConfig.update(themeKey, config.darkTheme, true);
    scheduleEvery(hours + lightTime);
  }
}

export function activate() {
  getConfig();
  switchThemeByTime();
  configActivate(() => {
    switchThemeByTime();
  });
}
export function deactivate() {
  configDeactivate();
}
