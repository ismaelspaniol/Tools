export interface ParsedDataUrl {
  mimeType: string;
  base64: string;
}

export function parseBase64Input(value: string, fallbackMimeType: string): ParsedDataUrl {
  const trimmed = value.trim();
  const match = trimmed.match(/^data:([^;]+);base64,(.+)$/i);

  if (match) {
    return {
      mimeType: match[1],
      base64: match[2].replace(/\s+/g, ''),
    };
  }

  return {
    mimeType: fallbackMimeType,
    base64: trimmed.replace(/\s+/g, ''),
  };
}

export async function fileToDataUrl(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Falha ao ler o arquivo.'));
      }
    };

    reader.onerror = () => reject(new Error('Falha ao ler o arquivo.'));
    reader.readAsDataURL(file);
  });
}

export function dataUrlToBlob(dataUrl: string): Blob {
  const parsed = parseBase64Input(dataUrl, 'image/png');
  const binary = atob(parsed.base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new Blob([bytes], { type: parsed.mimeType });
}
