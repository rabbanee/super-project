import { monthNames } from "@data/months";

const convertMonthNameToMonthNumber = (monthName: string) => monthNames.indexOf(monthName) + 1;

export default convertMonthNameToMonthNumber;