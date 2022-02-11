'use strict';
import { workspace, ExtensionContext } from 'vscode';
import { config, getConfig, configActivate, configDeactivate } from './config';

let themeKey = 'workbench.colorTheme';
const userConfig = workspace.getConfiguration();

//TODO: schedule at time switch;
function scheduleEvery(time: string) {

}

function getHours(timeStr: string = '') {
  let time = new Date(timeStr ?? null);
  return time.getHours() + time.getMinutes() / 60;
}

function switchThemeByTime() {
  const hours = getHours();
  if (getHours(config.lightTime) <= hours && hours < getHours(config.darkTime)) {
    userConfig.update(themeKey, config.lightTheme, true);
  } else {
    userConfig.update(themeKey, config.darkTheme, true);
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
