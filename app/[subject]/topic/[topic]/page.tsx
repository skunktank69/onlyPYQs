import Link from "next/link";
import { fetchJson, API_BASE } from "@/lib/api";
import { fileToSlug } from "@/lib/jee/parse-file-slug";
import { TopicFileRow } from "@/components/topic-file-row";

type ApiFile = {
  file: string;
  rel_path: string;
  questions: unknown[];
  answer_key?: string[];
  explanations?: string[];
};

type ApiResponse = {
  total: number;
  returned: number;
  data: ApiFile[];
};

export default async function TopicFilesPage({
  params,
}: {
  params: Promise<{ subject: string; topic: string }>;
}) {
  const { subject, topic } = await params;

  const content = await fetchJson<ApiResponse>(
    `${API_BASE}/api/questions/${subject}/${topic}`,
  );

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
        <div className="text-foreground">
          <span className="font-semibold">{topic}</span>
          <span className="text-muted-foreground mx-1">
            ({content.data.length} files)
          </span>
        </div>
      </div>

      <div className="w-full max-w-3xl">
        <div className="border border-border/60">
          {content.data.map((f) => {
            const slug = fileToSlug(f.file);
            const questionCount = Array.isArray(f.questions)
              ? f.questions.length
              : 0;

            return (
              <TopicFileRow
                key={f.file}
                href={`/${subject}/topic/${topic}/file/${slug}`}
                title={slug}
                subtitle={`${questionCount} questions`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
