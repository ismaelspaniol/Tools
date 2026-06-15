export function compactValue(value: string): string {
  return value.replace(/[^0-9A-Za-z]/g, '').toUpperCase();
}

export function isRepeatedSequence(value: string): boolean {
  if (value.length === 0) {
    return false;
  }

  return value.split('').every((character) => character === value[0]);
}
