export function randomInt(maxExclusive: number): number {
  return Math.floor(Math.random() * maxExclusive);
}

export function randomDigit(): string {
  return String(randomInt(10));
}
