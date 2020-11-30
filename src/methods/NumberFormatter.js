export const NumberFormatter = incomingNumber => {
  let formattedNumber;
  //console.log("test51002 incomingNumber", incomingNumber);
  // if (typeof incomingNumber !== "string") {
  //   //  console.log("turn number to string");
  //   incomingNumber = incomingNumber.toString();
  // }

  // if (incomingNumber.includes(".")) {
  //   incomingNumber = incomingNumber.replace(".", "");
  // }

  let digits = incomingNumber.length;

  //console.log("digits", digits);

  switch (true) {
    case digits < 4:
      formattedNumber = incomingNumber;
      break;
    case digits == 4:
      formattedNumber = toFourDigits();
      break;
    case digits <= 6:
      formattedNumber = toSixDigits();
      break;
    case digits <= 9:
      formattedNumber = toNineDigits();
      break;
    case digits > 9:
      formattedNumber = "+999M";
      break;
    default:
      formattedNumber = "...";
      console.log("statistics format error");
      break;
  }

  function toFourDigits() {
    let firstPart = incomingNumber.slice(0, digits - 3);
    let secondPart = incomingNumber.slice(digits - 3, digits);
    let styledNumber = firstPart + "." + secondPart;
    return styledNumber;
  }

  function toSixDigits() {
    let firstPart = incomingNumber.slice(0, digits - 3);
    let secondPart = incomingNumber.slice(digits - 3, digits - 2);
    let unit = "K";

    // console.log("firstPart:", firstPart);
    // console.log("secondPart:", secondPart);

    let styledNumber = firstPart + "," + secondPart + unit;
    return styledNumber;
  }

  function toNineDigits() {
    //console.log('to nine')
    let firstPart = incomingNumber.slice(0, digits - 6);
    let secondPart = incomingNumber.slice(digits - 6, digits - 5);
    let unit = "M";

    //console.log("firstPart:", firstPart);
    //console.log("secondPart:", secondPart);
    let styledNumber = firstPart + "," + secondPart + unit;
    //console.log('styledNumber', styledNumber)
    return styledNumber;
  }

  //console.log('test51003 formattedNumber' , formattedNumber);
  return formattedNumber;
};
