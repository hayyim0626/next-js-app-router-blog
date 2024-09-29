const comma = (val: string) => {
  return val.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};

export const withCommas = (amount: string | number): string => {
  if (typeof amount === 'number') {
    amount = String(amount);
  }
  const integar = amount.split('.')[0];
  const decimal = amount.split('.')[1];
  if (decimal === undefined) {
    return comma(amount);
  } else {
    return comma(integar) + '.' + decimal;
  }
};
