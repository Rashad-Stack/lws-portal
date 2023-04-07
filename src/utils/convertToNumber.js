export const convertToNumber = (str) => {
  let suffix = str.slice(-1);
  let number = parseFloat(str.slice(0, -1));
  if (suffix === "K") {
    return number * 1000;
  } else if (suffix === "M") {
    return number * 1000000;
  } else {
    return parseFloat(str);
  }
};
