import {
  NPMScriptManager,
  ScriptManager,
  YarnScriptManager,
} from "../../lib/nsm";
import { execSync } from "child_process";
import { existsSync, writeFileSync } from "fs";
jest.mock("child_process");
jest.mock("fs");

const mockedExecSync = execSync as jest.MockedFunction<typeof execSync>;
const mockedExistsSync = existsSync as jest.MockedFunction<typeof existsSync>;

describe("ScriptManager methods", () => {
  beforeEach(() => jest.resetAllMocks());
  test("localManager static method returns proper package manager name", () => {
    const managerName = ScriptManager.localManager();
    expect(managerName).toEqual("npm");
    expect(mockedExistsSync).toHaveBeenCalledWith("yarn.lock");
  });
  test("creation method returns yarn instance if yarn.lock", () => {
    mockedExistsSync.mockImplementation(() => true); //this mocks fs.existsSync("yarn.lock") => true
    const localManagerName = ScriptManager.localManager();
    const newManagerInstance = ScriptManager.create();
    expect(localManagerName).toEqual("yarn");
    expect(newManagerInstance).toBeInstanceOf(YarnScriptManager);
  });
  test("creation method returns npm instance if no yarn.lock", () => {
    mockedExistsSync.mockImplementation(() => false); //this mocks fs.existsSync("yarn.lock") => false
    const localManagerName = ScriptManager.localManager();
    const managerInstance = ScriptManager.create();
    expect(localManagerName).toEqual("npm");
    expect(managerInstance).toBeInstanceOf(NPMScriptManager);
  });
  test("npx method", () => {
    const managerInstance = ScriptManager.create();
    managerInstance.npx("mock-package");
    expect(mockedExecSync).toHaveBeenCalledWith("npx mock-package");
  });
  test("npx method with subcommands", () => {
    const managerInstance = ScriptManager.create();
    managerInstance.npx("mock-package", "mock-subcommand");
    expect(mockedExecSync).toHaveBeenCalledWith(
      "npx mock-package mock-subcommand"
    );
  });
});

describe("NPMScriptManager", () => {
  beforeEach(() => jest.resetAllMocks());
  test("install package", () => {
    const managerInstance = ScriptManager.create();
    managerInstance.install("mock-package");
    expect(mockedExecSync).toHaveBeenCalledWith("npm i mock-package");
  });
  test("install package --save-dev", () => {
    const managerInstance = ScriptManager.create();
    managerInstance.installDev("mock-package");
    expect(mockedExecSync).toHaveBeenCalledWith("npm i -D mock-package");
  });
  test("uninstall package", () => {
    const managerInstance = ScriptManager.create();
    managerInstance.uninstall("mock-package");
    expect(mockedExecSync).toHaveBeenCalledWith("npm uninstall mock-package");
  });
});

describe("YarnScriptManager", () => {
  beforeEach(() => jest.resetAllMocks());
  test("install package", () => {
    const managerInstance = new YarnScriptManager();
    managerInstance.install("mock-package");
    expect(mockedExecSync).toHaveBeenCalledWith("yarn add mock-package");
  });
  test("install package --save-dev", () => {
    const managerInstance = new YarnScriptManager();
    managerInstance.installDev("mock-package");
    expect(mockedExecSync).toHaveBeenCalledWith("yarn add -D mock-package");
  });
  test("uninstall package", () => {
    const managerInstance = new YarnScriptManager();
    managerInstance.uninstall("mock-package");
    expect(mockedExecSync).toHaveBeenCalledWith("yarn remove mock-package");
  });
});
