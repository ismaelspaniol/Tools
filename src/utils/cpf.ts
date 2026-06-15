import { randomDigit } from './random';
import { compactValue, isRepeatedSequence } from './validation';

function calculateDigit(base: string[]): string {
  const startWeight = base.length + 1;
  const sum = base.reduce((accumulator, character, index) => {
    return accumulator + Number(character) * (startWeight - index);
  }, 0);

  const remainder = sum % 11;
  return remainder < 2 ? '0' : String(11 - remainder);
}

export function generateCpf(): string {
  const body = Array.from({ length: 9 }, () => randomDigit());
  const firstDigit = calculateDigit(body);
  const secondDigit = calculateDigit([...body, firstDigit]);
  return [...body, firstDigit, secondDigit].join('');
}

export function formatCpf(value: string): string {
  const normalized = compactValue(value).slice(0, 11);
  return normalized.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

export function validateCpf(value: string): boolean {
  const normalized = compactValue(value);

  if (!/^\d{11}$/.test(normalized) || isRepeatedSequence(normalized)) {
    return false;
  }

  const body = normalized.slice(0, 9).split('');
  const firstDigit = calculateDigit(body);
  const secondDigit = calculateDigit([...body, firstDigit]);
  return normalized === `${body.join('')}${firstDigit}${secondDigit}`;
}
