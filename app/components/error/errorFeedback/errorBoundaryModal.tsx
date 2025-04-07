import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MdError } from "react-icons/md";
import { useErrorBoundaryStore } from "./useErrorBoundary";
import { addSearchParamsInUrl } from "@/utils/add-and-remove-search-params";

export default function ErrorBoundaryModal({ children }: any) {
  const { isOpen, openErrorBoundaryModal, closeErrorBoundaryModal } =
    useErrorBoundaryStore();

  const handleOpenTicketForm = () => {
    closeErrorBoundaryModal();
    addSearchParamsInUrl("CreateTicket", "y");
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) =>
        !isOpen ? closeErrorBoundaryModal() : openErrorBoundaryModal()
      }
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col items-center justify-center">
        <DialogHeader className="flex flex-col items-center justify-center space-y-6">
          <div className="flex flex-col items-center justify-center">
            <MdError className="text-destructive text-6xl mb-4" />
            <DialogTitle className="text-center">Erro inesperado</DialogTitle>
            <DialogDescription className="text-center mt-2">
              Gostaria de abrir um ticket para o time de suporte?
            </DialogDescription>
          </div>
          <div className="flex flex-row justify-center gap-4 items-center w-full mt-6">
            <Button variant="outline" onClick={() => closeErrorBoundaryModal()}>
              Cancelar
            </Button>
            <Button onClick={() => handleOpenTicketForm()}>Abrir Ticket</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
