export function formatJson(value: string): string {
  return JSON.stringify(JSON.parse(value), null, 2);
}

export function minifyJson(value: string): string {
  return JSON.stringify(JSON.parse(value));
}
