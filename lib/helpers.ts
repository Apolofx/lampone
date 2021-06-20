import fs from "fs";
import { PackageJson } from "type-fest";

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

export { editPacakgeJson };
