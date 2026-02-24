import type { CSSProperties } from "react";

export function useGrid(minItemWidth: string = "260px") {
  return {
    className: "grid w-full",
    style: {
      gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
    } satisfies CSSProperties,
  };
}
