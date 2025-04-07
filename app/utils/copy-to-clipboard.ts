import { toast } from 'sonner';

export const copyToClipboard = async (e: any, message: string) => {
  e.preventDefault();
  e.stopPropagation();
  toast.info('Copiado para a área de transferência');
  await navigator.clipboard.writeText(message);
};
