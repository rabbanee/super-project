export const rangeOfYears = (startYear?: number) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  startYear = startYear ?? 2020;
  
  while (startYear <= currentYear) {
    years.push(startYear);
    startYear++;
  }
  return years;
}