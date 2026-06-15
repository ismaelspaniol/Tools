interface JwtPart {
  raw: string;
  json: string | null;
}

function base64UrlToBase64(value: string): string {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const remainder = padded.length % 4;
  return remainder === 0 ? padded : `${padded}${'='.repeat(4 - remainder)}`;
}

function decodePart(value: string): string {
  return atob(base64UrlToBase64(value));
}

function prettyJson(raw: string): string | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return null;
  }
}

export interface DecodedJwt {
  header: JwtPart;
  payload: JwtPart;
  signature: string;
}

export function decodeJwt(token: string): DecodedJwt | null {
  const parts = token.trim().split('.');

  if (parts.length !== 3) {
    return null;
  }

  try {
    const headerRaw = decodePart(parts[0]);
    const payloadRaw = decodePart(parts[1]);

    return {
      header: { raw: headerRaw, json: prettyJson(headerRaw) },
      payload: { raw: payloadRaw, json: prettyJson(payloadRaw) },
      signature: parts[2],
    };
  } catch {
    return null;
  }
}
