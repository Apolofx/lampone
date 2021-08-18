#!/usr/bin/env node
import minimist from "minimist";
import { SetPrettier } from "./lib/scripts";
import { initCLI } from "./lib/helpers";
import { Argv } from "types";
import { debug } from "./lib/config";
import { askSelectedTools } from "./lib/inquirer";
import { PRETTIER } from "./lib/constants";

initCLI();
const args: Argv = minimist(process.argv.slice(2));
debug(args);
async function main() {
  //If no flags passed to command line
  if (Object.keys(args).length < 2) {
    try {
      const answers = await askSelectedTools();
      debug(JSON.stringify(answers, null, 2));
      answers["selected-tools"].includes(PRETTIER) && SetPrettier();
    } catch (error) {
      if (error.isTtyError) {
      } else {
        console.error("Something went wrong");
      }
    }
  } else {
    // else If there are non-default arguments present in argv run CLI
    SetPrettier({ format: args["format"], precommit: args["precommit"] });
  }
}

main();
