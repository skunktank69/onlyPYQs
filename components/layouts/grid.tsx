import * as React from "react";
import { cn } from "@/lib/utils";
import { useGrid } from "@/lib/use-grid";

type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  minItemWidth?: string;
  gapClassName?: string;
};

export const GridLayout = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      minItemWidth = "260px",
      gapClassName = "gap-4",
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const grid = useGrid(minItemWidth);

    return (
      <div
        ref={ref}
        className={cn(grid.className, gapClassName, className)}
        style={{ ...grid.style, ...style }}
        {...props}
      />
    );
  },
);

GridLayout.displayName = "GridLayout";
