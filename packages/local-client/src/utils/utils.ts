export const formatString = (text: string, args: string[]) => {
  // use replace to iterate over the string
  // select the match and check if related argument is present
  // if yes, replace the match with the argument
  return text.replace(/{([0-9]+)}/g, (match, index) => {
    // check if the argument is present
    return typeof args[index] == "undefined" ? match : args[index];
  });
};

// genrate random GUID 
export const generateRandomId = (length: number) => {
  return Math.round(
    Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)
  )
    .toString(36)
    .slice(1);
};
