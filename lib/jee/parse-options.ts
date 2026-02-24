export function parseOptionsHtml(optionsHtml?: string) {
  if (!optionsHtml) return [];

  const s = optionsHtml.replace(/\r/g, "").trim();

  const re = /(?:^|\n)\s*(\d+)\.\s*([\s\S]*?)(?=(?:\n\s*\d+\.\s)|\s*$)/g;

  const out: { index: number; html: string }[] = [];
  let m: RegExpExecArray | null;

  while ((m = re.exec(s)) !== null) {
    out.push({ index: Number(m[1]), html: m[2].trim() });
  }

  return out;
}
