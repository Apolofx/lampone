#!/usr/bin/env node
import minimist, { ParsedArgs } from "minimist";
import figlet from "figlet";
import { clear } from "console";
import { SetPrettier } from "./lib/scripts";
import { Argv } from "types";
import inquirer from "inquirer";

clear();

console.log(
  figlet.textSync("Lampone", {
    font: "Larry 3D",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  })
);

const args: Argv = minimist(process.argv.slice(2));
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
        console.log("couldn't be rendered in the current environment");
        // Prompt
      } else {
        console.error("Something went wrong");
      }
    });
} else {
  SetPrettier(args["pre-commit"]);
}
