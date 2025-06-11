import InputFieldCopyAndPaste from '@/components/ui-modified/inputFieldCopyAndPaste';

export function DefaultIntegrationForm({ token }: { token: string }) {
  return (
    <>
      <div className="flex w-full justify-between mb-6">
        <span>Utilize o nosso token para integrar</span>
      </div>
      <div className=" w-full  flex flex-col gap-2">
        <InputFieldCopyAndPaste code={token} />
      </div>
    </>
  );
}
