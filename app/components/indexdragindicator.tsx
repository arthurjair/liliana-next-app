type IndexDragIndicatorProps = {
  opacity: number;
  onClick?: () => void;
};

export default function IndexDragIndicator({
  opacity,
  onClick,
}: IndexDragIndicatorProps) {
  const isHidden = opacity < 0.1;

  return (
    <button
      type="button"
      aria-label="Scroll to recent works"
      onClick={onClick}
      tabIndex={isHidden ? -1 : 0}
      style={{ opacity }}
      className={`indicator-float group fixed left-6 top-[40%] z-40 flex h-28 w-28 -translate-y-1/2 cursor-pointer flex-col items-center justify-center rounded-full bg-black p-6 text-center text-sm font-medium tracking-wide text-white transition-[opacity,scale,background-color] duration-300 hover:scale-105 hover:bg-[#2E9EFF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black lg:left-20 lg:h-35 lg:w-35 ${isHidden ? "pointer-events-none" : ""}`}
    >
      <span className="lg:text-lg">scroll for</span>
      <span className="text-sm w-40 lg:text-lg">recent works</span>
      <span className="indicator-nudge mt-2 text-2xl lg:text-3xl leading-none" aria-hidden="true">←</span>
    </button>
  );
}