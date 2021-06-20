#!/usr/bin/env node
import minimist, { ParsedArgs } from "minimist";
import figlet from "figlet";
import { clear } from "console";
import { SetPrettier } from "./lib/scripts";
import { Argv } from "types";

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

//TODO use yarg or any other library to parse cli args
//TODO add cli to set script options
