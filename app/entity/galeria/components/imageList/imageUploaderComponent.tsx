import { useApiMutation } from '@/core/useAPI';
import { useQueryClient } from '@tanstack/react-query';
import { ImagePlus, Loader2 } from 'lucide-react';
import { useState } from 'react';

export function ImageUploaderComponent() {
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();

  const uploadImage = useApiMutation<any>('/users/gallery', 'post', {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['/users/gallery'],
      });
      setIsUploading(false);
    },
    onError: () => {
      setIsUploading(false);
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar se é uma imagem
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('files', file);

    try {
      await uploadImage.mutateAsync(formData);
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao fazer upload da imagem. Tente novamente.');
    }
  };

  return (
    <label className="rounded-lg bg-muted shadow-sm text-muted-foreground w-32 h-32 cursor-pointer flex flex-col items-center justify-center gap-2 hover:bg-muted/80 transition-colors">
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      {isUploading ? (
        <>
          <Loader2 size={32} className="animate-spin" />
          <span className="text-sm">Enviando...</span>
        </>
      ) : (
        <>
          <ImagePlus size={32} />
          <span className="text-sm">Upload</span>
        </>
      )}
    </label>
  );
}
