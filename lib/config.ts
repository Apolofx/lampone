export const environments = {
  ENV: process.env.NODE_ENV,
};

export const debug = (arg: any) => {
  environments.ENV === "dev" && console.debug(arg);
};
