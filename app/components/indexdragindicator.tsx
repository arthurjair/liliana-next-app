type IndexDragIndicatorProps = {
  opacity: number;
};

export default function IndexDragIndicator({
  opacity,
}: IndexDragIndicatorProps) {
  return (
    <div
      aria-label="Scroll for recent works"
      style={{ opacity }}
      className="fixed left-6 top-2/8 z-40 flex h-28 w-28 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-black p-6 text-center text-xs font-medium tracking-wide text-white transition-opacity duration-300"
    >
      <span>scroll for</span>
      <span>recent works</span>
      <span className="mt-2 text-3xl leading-none">←</span>
    </div>
  );
}