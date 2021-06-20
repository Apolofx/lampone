#!/usr/bin/env node
import minimist, { ParsedArgs } from "minimist";
import figlet from "figlet";
import { clear } from "console";
import { SetPrettier } from "./lib/scripts";
import { Argv } from "types";
//TODO add menu to choose between scripts
//if not script-specific flag in cli args is present
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
SetPrettier(args["pre-commit"]);
