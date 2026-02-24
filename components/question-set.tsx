"use client";

import * as React from "react";

type ApiQuestion = {
  number: number;
  question_type: "mcq" | "value" | string;
  text_html: string;
  options_html?: string; // could be <li>..</li> or <p>..</p> etc.
};

function answerMap(answer_key?: string[]) {
  const m = new Map<number, string>();
  (answer_key ?? []).forEach((k, i) => m.set(i + 1, (k ?? "").trim()));
  return m;
}

function explanationMap(explanations?: string[]) {
  const m = new Map<number, string>();
  (explanations ?? []).forEach((e, i) => m.set(i + 1, e ?? ""));
  return m;
}

function mcqKeyToIndex(key: string) {
  const k = (key || "").trim().toUpperCase();
  if (k === "A") return 1;
  if (k === "B") return 2;
  if (k === "C") return 3;
  if (k === "D") return 4;
  return null;
}

function indexToKey(i: number) {
  // 1..4 -> A..D
  return ["A", "B", "C", "D"][i - 1] ?? "?";
}

function normalizeValue(s: string) {
  return (s ?? "").trim().replace(/\s+/g, "");
}

// More robust parsing: supports <li>, <p>, <br>, or raw separated lines.
// Always returns at most 4 options.
function parseOptions(options_html?: string) {
  if (!options_html) return [];

  const raw = String(options_html).trim();
  if (!raw) return [];

  // Prefer <li> split if present
  if (/<li[\s>]/i.test(raw)) {
    const parts = raw
      .split(/<\/li>/i)
      .map((x) => x.replace(/<li[^>]*>/gi, "").trim())
      .filter(Boolean)
      .slice(0, 4);

    return parts.map((html, i) => ({
      index: i + 1,
      key: indexToKey(i + 1),
      html,
    }));
  }

  // Fall back: split on <br> or </p> or newline-ish
  const parts = raw
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<p[^>]*>/gi, "")
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);

  return parts.map((html, i) => ({
    index: i + 1,
    key: indexToKey(i + 1),
    html,
  }));
}

export function QuestionSet({
  questions,
  answer_key,
  explanations,
}: {
  // "@ts-expect-erro - please
  questions: ApiQuestion[];
  answer_key?: string[];
  explanations?: string[];
}) {
  const answers = React.useMemo(() => answerMap(answer_key), [answer_key]);
  const expls = React.useMemo(
    () => explanationMap(explanations),
    [explanations],
  );

  const [mcqPick, setMcqPick] = React.useState<Record<number, number>>({});
  const [valuePick, setValuePick] = React.useState<Record<number, string>>({});
  const [reveal, setReveal] = React.useState<Record<number, boolean>>({});

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={() => {
            const next: Record<number, boolean> = {};
            for (const q of questions) next[q.number] = true;
            setReveal(next);
          }}
        >
          Reveal all
        </button>
        <button type="button" onClick={() => setReveal({})}>
          Hide all
        </button>
      </div>

      {questions.map((q) => {
        const key = answers.get(q.number) ?? "";
        const exp = expls.get(q.number) ?? "";

        const isMcq = q.question_type === "mcq";
        const isValue = q.question_type === "value";

        const correctIndex = isMcq ? mcqKeyToIndex(key) : null;
        const pickedIndex = mcqPick[q.number];
        const pickedValue = valuePick[q.number] ?? "";

        const hasPicked = isMcq
          ? pickedIndex != null
          : pickedValue.trim().length > 0;

        const isCorrect =
          isMcq && correctIndex != null && pickedIndex != null
            ? pickedIndex === correctIndex
            : isValue && key
              ? normalizeValue(pickedValue) === normalizeValue(key)
              : false;

        const options = isMcq ? parseOptions(q.options_html) : [];

        const showMcqOptions = isMcq && options.length > 0;

        return (
          <div
            key={`${q.number}-${q.question_type}`}
            style={{
              border: "1px solid #333",
              padding: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 8,
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.8 }}>
                Q{q.number} • {String(q.question_type).toUpperCase()}
                {key && hasPicked ? (
                  <span style={{ marginLeft: 8 }}>
                    {isCorrect ? "Correct" : "Not sure"}
                  </span>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() =>
                  setReveal((r) => ({ ...r, [q.number]: !r[q.number] }))
                }
              >
                {reveal[q.number] ? "Hide" : "Reveal"} answer
              </button>
            </div>

            <div dangerouslySetInnerHTML={{ __html: q.text_html }} />

            {showMcqOptions ? (
              <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                {options.map((opt) => {
                  const checked = pickedIndex === opt.index;

                  const isRight =
                    reveal[q.number] && correctIndex === opt.index;
                  const isWrongPick =
                    reveal[q.number] && checked && correctIndex !== opt.index;

                  return (
                    <label
                      key={opt.index}
                      style={{
                        display: "flex",
                        gap: 10,
                        border: "1px solid #333",
                        padding: 10,
                        cursor: "pointer",
                        opacity:
                          reveal[q.number] && !isRight && !isWrongPick
                            ? 0.75
                            : 1,
                        outline: isRight
                          ? "2px solid #5a5"
                          : isWrongPick
                            ? "2px solid #a55"
                            : "none",
                        outlineOffset: 2,
                      }}
                    >
                      <input
                        type="radio"
                        name={`q-${q.number}`}
                        checked={checked}
                        onChange={() =>
                          setMcqPick((p) => ({ ...p, [q.number]: opt.index }))
                        }
                      />

                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            opacity: 0.7,
                            marginBottom: 4,
                          }}
                        >
                          Option {opt.key}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: opt.html }} />
                      </div>
                    </label>
                  );
                })}
              </div>
            ) : isMcq ? (
              <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
                Options missing / could not parse.
              </div>
            ) : null}

            {isValue ? (
              <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                <input
                  value={pickedValue}
                  onChange={(e) =>
                    setValuePick((p) => ({ ...p, [q.number]: e.target.value }))
                  }
                  placeholder="Enter value"
                  style={{ flex: 1, padding: 8 }}
                />
                <button
                  type="button"
                  onClick={() =>
                    setValuePick((p) => ({ ...p, [q.number]: "" }))
                  }
                >
                  Clear
                </button>
              </div>
            ) : null}

            {reveal[q.number] ? (
              <div
                style={{
                  marginTop: 12,
                  paddingTop: 10,
                  borderTop: "1px solid #333",
                }}
              >
                <div>
                  <span style={{ opacity: 0.7 }}>Answer: </span>
                  <b>{key || "N/A"}</b>
                </div>

                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>Explanation</div>
                  {exp ? (
                    <div dangerouslySetInnerHTML={{ __html: exp }} />
                  ) : (
                    <div style={{ fontSize: 12, opacity: 0.7 }}>
                      No explanation available.
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
