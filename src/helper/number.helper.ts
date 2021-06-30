export function extractNumberFromUrl(url: string): number | null {
  if (!url) {
    return null;
  }
  const regex = /\d+/g;
  const result = url.match(regex);
  return Number(result);
}
