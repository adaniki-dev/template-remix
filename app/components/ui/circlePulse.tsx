export default function CirclePulse() {
  return (
    <span className="absolute flex h-3 w-3 mb-6 ml-7">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
    </span>
  );
}
