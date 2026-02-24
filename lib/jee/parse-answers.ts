export function buildAnswerMap(answerKey: string[] | undefined) {
  const map = new Map<number, string>();
  if (!answerKey) return map;

  for (const entry of answerKey) {
    const m = entry.match(/^Q(\d+)\s*:\s*(.+)\s*$/i);
    if (!m) continue;
    map.set(Number(m[1]), m[2].trim());
  }
  return map;
}

export function buildExplanationMap(explanations: string[] | undefined) {
  const map = new Map<number, string>();
  if (!explanations) return map;

  for (const block of explanations) {
    const m = block.match(/^Q(\d+)\s*:\s*([\s\S]*)$/i);
    if (!m) continue;
    map.set(Number(m[1]), m[2].trim());
  }
  return map;
}

export function mcqKeyToIndex(key: string) {
  // "A"->1, "B"->2, ...
  const k = key.trim().toUpperCase();
  if (k === "A") return 1;
  if (k === "B") return 2;
  if (k === "C") return 3;
  if (k === "D") return 4;
  return null;
}

export function normalizeValueAnswer(s: string) {
  return s.trim().replace(/\s+/g, " ");
}
