import { monthNames } from "@data/months";

const convertDate = (date: string) => {
  const year = date.split('-')[0];
  return `${date.split('-')[2]} ${monthNames[parseInt(date.split('-')[1]) + 1]} ${year}`
};

export default convertDate;