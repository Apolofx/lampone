import { ParsedArgs } from "minimist";

interface Argv extends ParsedArgs {
  precommit?: boolean;
  format?: boolean;
}
