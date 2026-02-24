import Link from "next/link";
import { TopicCard } from "@/components/topic-card";
import { GridLayout } from "@/components/layouts/grid";

export default async function Page({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;

  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) throw new Error("Missing NEXT_PUBLIC_API_URL");

  const response = await fetch(`${base}/api/topics/${subject}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch topics for ${subject}: ${response.status}`,
    );
  }

  const data: unknown = await response.json();
  const topics = Array.isArray(data) ? (data as string[]) : [];

  return (
    <div className="min-h-screen w-full flex flex-col gap-8 p-4 sm:p-8 lg:p-12 xl:p-20">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          home
        </Link>
        <span>/</span>
        <div className="text-foreground">
          <span className="font-semibold">{subject}</span>{" "}
          <span className="text-muted-foreground">
            ({topics.length} topics)
          </span>
        </div>
      </div>

      <div className="w-full">
        <GridLayout
          minItemWidth="280px"
          gapClassName="gap-3"
          className="max-w-6xl mx-auto"
        >
          {topics.map((topic) => (
            <TopicCard key={topic} subject={subject} topic={topic} />
          ))}
        </GridLayout>
      </div>
    </div>
  );
}
