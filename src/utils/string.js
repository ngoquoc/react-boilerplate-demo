function s4(): string {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

export function gUuidV4(): string {
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export function toMoneyFormat(number) {
  return number
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+,)/g, '$1.')
    .replace(/,0+$/g, '');
}
