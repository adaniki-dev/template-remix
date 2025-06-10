'use client';
import InputField from '@/components/ui-modified/inputField';
import InputFieldTextArea from '@/components/ui-modified/inputFieldTextArea';
import { Button } from '@/components/ui/button';
import { useChannelsOperations } from '@/features/canais/hooks/useChannelsOperations';
import ImageGalleryField from '@/features/galeria/components/imageList/inputFieldGallery';
import MyForm from '@/lib/Formik/Form';
import { AiOutlineLoading } from 'react-icons/ai';

export default function FormEditChannels({ handleCloseModal, channelId }: any) {
  const { editChannel } = useChannelsOperations();

  return (
    <MyForm
      initialValues={{
        name: '',
        description: '',
        image: '',
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        const body = {
          id: channelId,
          name: values.name,
          description: values.description,
          image: values.image,
        };
        editChannel(body, {
          onSuccess: () => {
            handleCloseModal();
          },
          onSettled: () => {
            actions.setSubmitting(false);
          },
        });
      }}
    >
      {({ values, isSubmitting }) => {
        return (
          <div className="grid gap-2">
            <InputField
              label="Nome do seu canal"
              name="name"
              placeholder="Nome do seu canal"
              required
            />
            <InputFieldTextArea
              label="Descrição do seu canal"
              name="description"
              placeholder="Descrição do seu canal"
            />
            <ImageGalleryField
              name="image"
              placeholder="Coloque a URL da imagem"
              label="URL da imagem"
            />
            {isSubmitting && (
              <div className="bg-radial-gradient inset-0 w-full h-full absolute flex flex-col items-center justify-center gap-3 transition-all ease-out duration-300">
                <AiOutlineLoading className="text-4xl animate-spin text-primary" />
                <p className="text-lg">Estamos enviando suas alterações</p>
              </div>
            )}
            <Button disabled={isSubmitting} variant="outline" type="submit">
              {isSubmitting ? 'Editando...' : 'Editar'}
            </Button>
          </div>
        );
      }}
    </MyForm>
  );
}
