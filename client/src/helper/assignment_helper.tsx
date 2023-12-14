export const convertDateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dateString = `${year}-${month}-${day}`;

  return dateString;
};

export const convertStringToDate = (date: string) => {
  const dateObject = new Date(date);

  return dateObject;
};
