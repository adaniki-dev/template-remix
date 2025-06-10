export function ImageVisualizer({
  url,
  id,
  onClick,
}: {
  url: string;
  id: string;
  onClick?: () => void;
}) {
  return (
    <img
      src={url}
      alt={id}
      className="object-cover rounded-lg bg-muted text-muted-foreground max-w-32 w-32 max-h-32 h-32 shadow-md cursor-pointer"
      onClick={onClick}
    />
  );
}
