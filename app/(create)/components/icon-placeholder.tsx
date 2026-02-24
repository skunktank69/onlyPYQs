export function IconPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        width: 24,
        height: 24,
        borderRadius: 6,
        border: "1px dashed currentColor",
        opacity: 0.6,
      }}
    />
  );
}
