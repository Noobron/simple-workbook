export const serve = (port: number, filename: string, dir: string) => {
  console.log("Serving on port:", port);
  console.log("Working directory:", `\x1b[33m${dir}\x1b[0m`);
  console.log("Saving changes in file:", `\x1b[33m${filename}\x1b[0m`);
};
