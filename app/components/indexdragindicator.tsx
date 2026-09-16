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
      className="fixed left-6 top-[25%] z-40 flex h-28 w-28 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-black p-6 text-center text-sm font-medium tracking-wide text-white transition-opacity duration-300"
    >
      <span>drag for</span>
      <span className="text-sm w-40" >recent works</span>
      <span className="mt-2 text-2xl leading-none">←</span>
    </div>
  );
}