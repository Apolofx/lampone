import inquirer from "inquirer";

const askSelectedTools = () => {
  const questions = [
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
  ];
  return inquirer.prompt(questions);
};

export { askSelectedTools };
