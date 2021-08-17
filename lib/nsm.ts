// NSM -- Node Scripts Manager
import { execSync } from "child_process";
import fs from "fs";

type Manager = "yarn" | "npm";

abstract class ScriptManager {
  constructor() {}

  abstract install(packageName: string): void;
  abstract installDev(packageName: string): void;
  abstract uninstall(packageName: string): void;

  npx(packageName: string, subcommand = ""): void {
    const command = `npx ${packageName} ${subcommand}`.trim();
    execSync(command);
  }

  public static localManager(): Manager {
    if (fs.existsSync("yarn.lock")) return "yarn";
    else return "npm";
  }
  public static create(): ScriptManager {
    if (this.localManager() === "yarn") return new YarnScriptManager();
    else return new NPMScriptManager();
  }
}

class YarnScriptManager extends ScriptManager {
  install(packageName: string): void {
    execSync(`yarn add ${packageName}`);
  }
  installDev(packageName: string): void {
    execSync(`yarn add -D ${packageName}`);
  }
  uninstall(packageName: string): void {
    execSync(`yarn remove ${packageName}`);
  }
}

class NPMScriptManager extends ScriptManager {
  install(packageName: string): void {
    execSync(`npm i ${packageName}`);
  }
  installDev(packageName: string): void {
    execSync(`npm i -D ${packageName}`);
  }
  uninstall(packageName: string): void {
    execSync(`npm uninstall ${packageName}`);
  }
}

export { ScriptManager, NPMScriptManager, YarnScriptManager };
