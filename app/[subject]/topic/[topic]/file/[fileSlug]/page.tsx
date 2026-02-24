import Link from "next/link";
import { fetchJson, API_BASE } from "@/lib/api";
import { slugToFile } from "@/lib/jee/parse-file-slug";
import { QuestionSet } from "@/components/question-set";
import { renderMathInHtml } from "@/lib/use-mathjax";

type ApiQuestion = {
  number: number;
  question_type: "mcq" | "value" | string;
  text_html: string;
  options_html?: string;
};

type ApiFile = {
  file: string;
  questions: ApiQuestion[];
  answer_key?: string[];
  explanations?: string[];
};

type ApiResponse = {
  data: ApiFile[];
};

export default async function TopicFilePage({
  params,
}: {
  params: Promise<{ subject: string; topic: string; fileSlug: string }>;
}) {
  const { subject, topic, fileSlug } = await params;

  const content = await fetchJson<ApiResponse>(
    `${API_BASE}/api/questions/${subject}/${topic}`,
  );

  const targetFile = slugToFile(fileSlug);
  const fileObj = content.data.find((d) => d.file === targetFile);
  const questions =
    fileObj?.questions.map((q) => ({
      ...q,
      text_html: renderMathInHtml(q.text_html),
      options_html: q.options_html
        ? renderMathInHtml(q.options_html)
        : undefined,
    })) || ({} as unknown as ApiQuestion | "");

  const explanations = fileObj?.explanations?.map((e) => renderMathInHtml(e));

  if (!fileObj) {
    return (
      <div className="min-h-screen w-full p-6">
        <div className="text-sm text-muted-foreground mb-4">
          File not found: <span className="text-foreground">{fileSlug}</span>
        </div>
        <Link href={`/${subject}/topic/${topic}`} className="underline text-sm">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col gap-8 p-4 sm:p-8 lg:p-12 xl:p-20">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          home
        </Link>
        <span>/</span>
        <Link
          href={`/${subject}`}
          className="hover:text-foreground transition-colors"
        >
          <span className="font-semibold">{subject}</span>
        </Link>
        <span>/</span>
        <Link
          href={`/${subject}/topic/${topic}`}
          className="hover:text-foreground transition-colors"
        >
          <span className="font-semibold">{topic}</span>
        </Link>
        <span>/</span>
        <div className="text-foreground">
          <span className="font-semibold">{fileSlug}</span>
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <QuestionSet
          // @ts-expect-error please
          questions={questions}
          answer_key={fileObj?.answer_key}
          explanations={explanations}
        />
      </div>
    </div>
  );
}
