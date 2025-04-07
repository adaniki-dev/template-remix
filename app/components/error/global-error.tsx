import { Button } from "@/components/ui/button";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const navigation = useNavigate();

  useEffect(() => {
    if (error.message === "Unauthorized") {
    }
  }, [error]);
  return (
    <div className="flex w-full h-96 flex-col items-center justify-center gap-4">
      {error.message === "Unauthorized" ? (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">Unauthorized</h1>
          <p className="text-lg text-center">
            Você está sem acesso a essa página. Por favor, faça login novamente.
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-xl">
            Ops aconteceu um erro inesperado, por favor tente novamente
          </h1>
          <div>
            <Button onClick={() => navigation(`/dashboard/`)}>
              Voltar para dashboard
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
