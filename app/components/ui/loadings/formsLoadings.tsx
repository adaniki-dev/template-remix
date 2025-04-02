import { Icon } from "@/lib/icons";

export default function FormsLoadings({
  isSubmitting,
  message,
}: {
  isSubmitting: boolean;
  message: string;
}) {
  if (!isSubmitting) return null;
  return (
    <div className="bg-radial-gradient rounded-md inset-0 w-full h-full absolute flex flex-col items-center justify-center gap-3 transition-all ease-out duration-300">
      <Icon name="Loader" className="text-4xl animate-spin text-primary" />
      <p className="text-lg">{message}</p>
    </div>
  );
}
