const ViewCell = (value: string) => {
  const val = parseInt(value);
  let color = 'inherit';
  if (val >= 0 && val <= 25) {
    color = 'tomato';
  }
  if (val >= 26 && val <= 50) {
    color = 'orange';
  }
  if (val >= 51 && val <= 75) {
    color = 'yellow';
  }
  if (val >= 76 && val <= 100) {
    color = 'green';
  }

  return <span style={{ color: color }}>{value}</span>;
};

export default ViewCell;
