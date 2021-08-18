import inquirer from "inquirer";
import * as constants from "./constants";

const askSelectedTools = () => {
  const questions = [
    {
      name: "selected-tools",
      type: "checkbox",
      message: "Select tools/configs to install",
      choices: [
        new inquirer.Separator(" --- Tools --- "),
        {
          name: constants.PRETTIER,
        },
        // {
        //   name: constants.TYPESCRIPT,
        // },
        // {
        //   name: constants.GITIGNORE,
        // },
      ],
    },
  ];
  return inquirer.prompt(questions);
};

export { askSelectedTools };
