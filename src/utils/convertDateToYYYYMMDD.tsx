const convertDateToYYYYMMDD = (date) => {
  let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-")
};

export default convertDateToYYYYMMDD;