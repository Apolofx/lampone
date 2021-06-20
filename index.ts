#!/usr/bin/env node

import { SetPrettier } from "./lib/scripts";
//TODO use yarg or any other library to parse cli args
const precommit = Boolean(process.argv[2]);

SetPrettier(precommit);

//TODO add cli to set script options
