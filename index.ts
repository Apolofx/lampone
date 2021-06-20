#!/usr/bin/env node
import figlet from "figlet";
import filget from "figlet";
import { SetPrettier } from "./lib/scripts";
const precommit = Boolean(process.argv[2]);

console.log(
  figlet.textSync("Apolo", {
    font: "Larry 3D",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  })
);

SetPrettier(precommit);

//TODO use yarg or any other library to parse cli args
//TODO add cli to set script options
