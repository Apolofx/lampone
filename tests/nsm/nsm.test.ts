import { NPMScriptManager, ScriptManager } from "../../lib/nsm";
import { execSync } from "child_process";
jest.mock("child_process");

const mockedExecSync = execSync as jest.MockedFunction<typeof execSync>;

describe("ScriptManager methods", () => {
  beforeEach(() => jest.clearAllMocks());
  test("static methods", () => {
    const managerName = ScriptManager.localManager();
    expect(managerName).toEqual("npm");
    const managerInstance = ScriptManager.create();
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
  beforeEach(() => jest.clearAllMocks());
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
