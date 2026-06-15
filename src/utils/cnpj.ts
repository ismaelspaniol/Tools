import { randomDigit } from './random';
import { compactValue, isRepeatedSequence } from './validation';

const ALPHANUMERIC_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function charToValue(character: string): number {
  if (/^\d$/.test(character)) {
    return Number(character);
  }

  return character.charCodeAt(0) - 55;
}

function calculateDigit(base: string[], weights: number[]): string {
  const sum = base.reduce((accumulator, character, index) => {
    return accumulator + charToValue(character) * weights[index];
  }, 0);

  const remainder = sum % 11;
  return remainder < 2 ? '0' : String(11 - remainder);
}

function generateBody(alphanumeric: boolean): string[] {
  const source = alphanumeric ? ALPHANUMERIC_CHARS : '0123456789';
  return Array.from({ length: 12 }, () => source[randomIndex(source.length)]);
}

function randomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}

function normalize(value: string): string {
  return compactValue(value);
}

export function generateCnpj(alphanumeric: boolean): string {
  const body = generateBody(alphanumeric);
  const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const secondWeights = [6, ...firstWeights];
  const firstDigit = calculateDigit(body, firstWeights);
  const secondDigit = calculateDigit([...body, firstDigit], secondWeights);
  return [...body, firstDigit, secondDigit].join('');
}

export function formatCnpj(value: string): string {
  const normalized = normalize(value).slice(0, 14);
  return normalized.replace(/^(.{2})(.{3})(.{3})(.{4})(.{2})$/, '$1.$2.$3/$4-$5');
}

export function validateCnpj(value: string, alphanumeric: boolean): boolean {
  const normalized = normalize(value);
  const pattern = alphanumeric ? /^[0-9A-Z]{14}$/ : /^\d{14}$/;

  if (!pattern.test(normalized) || isRepeatedSequence(normalized)) {
    return false;
  }

  const body = normalized.slice(0, 12).split('');
  const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const secondWeights = [6, ...firstWeights];
  const firstDigit = calculateDigit(body, firstWeights);
  const secondDigit = calculateDigit([...body, firstDigit], secondWeights);

  return normalized === `${body.join('')}${firstDigit}${secondDigit}`;
}
