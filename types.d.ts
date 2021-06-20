import { ParsedArgs } from "minimist";

interface Argv extends ParsedArgs {
  "pre-commit"?: boolean;
}
