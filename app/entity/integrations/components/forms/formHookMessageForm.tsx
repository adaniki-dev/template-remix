import InputFieldTextArea from '@/components/ui-modified/inputFieldTextArea';
import { Button } from '@/components/ui/button';
import MyForm from '@/lib/Formik/Form';

export function FormHookMessageForm({ message, handleSubmit }: any) {
  // function highlightVariables(message) {
  //   const regex = /\{([^}]+)\}/g;
  //   const parts = message.split(regex);

  //   const htmlString = parts
  //     .map((part, index) => {
  //       if (index % 2 === 0) {
  //         return part;
  //       } else {
  //         return `<strong>{${part}}</strong>`;
  //       }
  //     })
  //     .join('');

  //   return `<p>${htmlString}</p>`;
  // }
  return (
    <div>
      <MyForm
        initialValues={{ message: message }}
        enableReinitialize={true}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
      >
        {({ isSubmitting }) => (
          <div className="space-y-3">
            <InputFieldTextArea
              className="h-36"
              name="message"
              label="Mensagem"
              placeholder="Digite a mensagem"
            />
            <Button disabled={isSubmitting} type="submit">
              Alterar Template
            </Button>
          </div>
        )}
      </MyForm>
    </div>
  );
}
