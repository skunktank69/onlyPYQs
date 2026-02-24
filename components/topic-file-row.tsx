import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TopicFileRow({
  href,
  title,
  subtitle,
}: {
  href: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Link
      href={href}
      className="
        group flex items-center justify-between
        w-full px-3 py-4
        border-b border-border/60
        transition-colors
        hover:bg-accent/40
        focus-visible:bg-accent/50
        outline-none
      "
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="h-2 w-2 rounded-full bg-muted-foreground/60 shrink-0" />
        <div className="min-w-0">
          <div className="truncate font-medium text-foreground">{title}</div>
          {subtitle ? (
            <div className="truncate text-sm text-muted-foreground">
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>

      <ArrowRight
        className="
          h-5 w-5 shrink-0 text-muted-foreground
          transition-transform duration-200
          group-hover:translate-x-1
          group-hover:text-foreground
        "
      />
    </Link>
  );
}
