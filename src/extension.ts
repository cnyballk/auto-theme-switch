'use strict';
import { workspace } from 'vscode';
import { config, getConfig, configActivate, configDeactivate } from './config';
import { getHours, getNow, scheduleEvery } from './utils';

const THEME_KEY = 'workbench.colorTheme';
const userConfig = workspace.getConfiguration();

export function switchThemeByTime() {
  const hours = getNow();
  const lightTime = getHours(config.lightTime);
  const darkTime = getHours(config.darkTime);

  if (lightTime <= hours && hours < darkTime) {
    userConfig.update(THEME_KEY, config.lightTheme, true);
    scheduleEvery(darkTime);
  } else {
    userConfig.update(THEME_KEY, config.darkTheme, true);
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
