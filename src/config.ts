import { workspace,ConfigurationChangeEvent, Disposable } from "vscode";

let listener: Disposable;

export interface Config {
  darkTheme: string;
  lightTheme: string;
  darkTime: string;
  lightTime: string;
}
export const config: Config = {
  darkTheme: "",
  lightTheme: "",
  darkTime: "",
  lightTime: "",
};

export function getConfig(e?: ConfigurationChangeEvent) {
  if (e && !e.affectsConfiguration("switchConfig")) return;
  const switchConfig = workspace.getConfiguration("switchConfig");
  config.darkTheme = switchConfig.get("darkTheme", "Visual Studio Dark");
  config.lightTheme = switchConfig.get("lightTheme", "Visual Studio Light");
  config.darkTime = switchConfig.get("darkTime", "18:00");
  config.lightTime = switchConfig.get("lightTime", "6:00");
}

export function configActivate(callback: () => void) {
  listener = workspace.onDidChangeConfiguration((e: ConfigurationChangeEvent) => {
    getConfig(e);
    callback();
  });
}
export function configDeactivate() {
  listener.dispose();
}
