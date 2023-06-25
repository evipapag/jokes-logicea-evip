import { format } from 'date-fns';

const DateCell = (value: string) => {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  const formattedDate = format(date, 'dd MMM yyyy');
  return formattedDate;
};

export default DateCell;
