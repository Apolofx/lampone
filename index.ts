#!/usr/bin/env node
import minimist, { ParsedArgs } from "minimist";
import { SetPrettier } from "./lib/scripts";
import { initCLI } from "./lib/helpers";
import { Argv } from "types";
import inquirer from "inquirer";
import { debug } from "./lib/config";

//TODO put questions array on a separate file inquirer.ts

initCLI();

const args: Argv = minimist(process.argv.slice(2));
debug(args);
if (Object.keys(args).length < 2) {
  inquirer
    .prompt([
      {
        name: "selected-tools",
        type: "checkbox",
        message: "Select tools/configs to install",
        choices: [
          new inquirer.Separator(" --- Tools --- "),
          {
            name: "Prettier",
          },
          // {
          //   name: "Typescript",
          // },
          // {
          //   name: "gitignore",
          // },
        ],
      },
    ])
    .then((answers) => {
      console.log(JSON.stringify(answers, null, 2));
      answers["selected-tools"].includes("Prettier") && SetPrettier();
    })
    .catch((error) => {
      if (error.isTtyError) {
      } else {
        console.error("Something went wrong");
      }
    });
} else {
  // If there are non-default arguments present in argv run CLI
  SetPrettier({ format: args["format"], precommit: args["precommit"] });
}
