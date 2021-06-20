#!/usr/bin/env node
import figlet from "figlet";
import { SetPrettier } from "./lib/scripts";

console.log(
  figlet.textSync("Lampone", {
    font: "Larry 3D",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  })
);

const precommit = Boolean(process.argv[2]);
SetPrettier(precommit);

//TODO use yarg or any other library to parse cli args
//TODO add cli to set script options
