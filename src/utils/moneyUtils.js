export const toMoneyFormat = (number: float) => {
  return number
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+,)/g, '$1.')
    .replace(/,0+$/g, '');
};
