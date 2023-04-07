export const convertToNumber = (str) => {
  if (typeof str === "string") {
    if (str.endsWith("K") || str.endsWith("k")) {
      return parseFloat(str.slice(0, -1)) * 1000;
    } else if (str.endsWith("M") || str.endsWith("m")) {
      return parseFloat(str.slice(0, -1)) * 1000000;
    } else {
      return parseFloat(str);
    }
  } else {
    return str;
  }
};
