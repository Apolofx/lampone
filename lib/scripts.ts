import { execSync } from "child_process";
import fs from "fs";

//---PRETTIER---//
function SetPrettier(precommit = false) {
  const rawPackageJSON = fs.readFileSync(`package.json`);
  const packageJSON = JSON.parse(rawPackageJSON.toString());
  //install
  execSync("npm install -D prettier", { stdio: [0, 1, 2] });

  //create prettier config and prettier ignore
  const ignored = "node_modules\nbuild\ndist\ncoverage\nassets";
  fs.writeFileSync(".prettierrc.json", JSON.stringify({}));
  fs.writeFileSync(".prettierignore", ignored);

  //format already written code
  execSync("npx prettier --write .", { stdio: [0, 1, 2] });

  //setup precommit
  if (precommit) {
    //TODO check for husky and lint-staged already in package.json
    execSync("npm install --save-dev husky lint-staged", { stdio: [0, 1, 2] });
    execSync("npx husky install", { stdio: [0, 1, 2] });
    if (!packageJSON["scripts"]["prepared"]) {
      packageJSON["scripts"]["prepared"] = "husky install";
    }
    execSync("npx husky add .husky/pre-commit 'npx lint-staged'", {
      stdio: [0, 1, 2],
    });

    packageJSON["lint-staged"] = {
      "**/*": "prettier --write --ignore-unknown",
    };
    fs.writeFileSync("package.json", JSON.stringify(packageJSON));
  }
}

export { SetPrettier };
