import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog';
import { Button } from '../button';
import { useAlertDialog } from '.';

export default function AlertModal({ children }: any) {
  const { modal, setModal, closeAlertModal, infoModal, handleContinue } = useAlertDialog();
  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col flex-wrap justify-center items-start">
            <DialogTitle>{infoModal.title}</DialogTitle>
            <DialogDescription className="mt-2">{infoModal.description}</DialogDescription>
            <div className="flex flex-row flex-wrap justify-end gap-4 items-center w-[100%] mt-4">
              <Button variant="outline" onClick={() => closeAlertModal()}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={() => handleContinue()}>
                Continuar
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
