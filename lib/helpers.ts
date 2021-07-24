import fs from "fs";
import figlet from "figlet";
import { clear } from "console";
import { PackageJson } from "type-fest";
import chalk from "chalk";

interface CustomPackageJSON extends PackageJson {
  "lint-staged": string;
}

//---WIP---//
function editPacakgeJson(
  field: keyof CustomPackageJSON,
  value: string | { [key: string]: string }
) {
  const rawPackageJSON = fs.readFileSync(`package.json`);
  const packageJSON = JSON.parse(rawPackageJSON.toString());
  packageJSON[field] = value;
  fs.writeFileSync("package.json", JSON.stringify(packageJSON));
}

function initCLI() {
  clear();
  console.log(
    chalk.yellow(
      figlet.textSync("Lampone", {
        font: "Larry 3D",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    )
  );
}

export { editPacakgeJson, initCLI };
