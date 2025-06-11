'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormHookMessageForm } from '../../../forms/formHookMessageForm';
import FormSwapNumbers from '../../../forms/formHookSwapNumbers';
import ShowNumberAndGroups from './showNumberAndGroups';
import ShowHooksVariables from './showHooksVariables';
import { Switch } from '@/components/ui/switch';
import { useHooksActions } from '@/features/integrations/hooks/useHooksActions';
import { toast } from 'sonner';

export default function TabaHooksDetails({ handleSubmit, hook, type }: any) {
  const { hookIntegrationToggleAdminStatus } = useHooksActions();
  return (
    <Tabs defaultValue="message" className="flex flex-col gap-2 overflow-auto h-[83vh] px-4">
      <TabsList className="w-full">
        <TabsTrigger className="w-full" value="message">
          Mensagem
        </TabsTrigger>
        {type === 'admin' && (
          <TabsTrigger className="w-full" value="registerPhone">
            Telefones
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="message">
        {type === 'admin' && (
          <div className="flex p-2 justify-between mb-4 border border-yellow-500 rounded-md bg-yellow-400/60">
            <p>Enviar a mensagem apenas para Adminitradores</p>
            <Switch
              checked={hook.isMessageEnabled}
              onClick={() => {
                hookIntegrationToggleAdminStatus(
                  { hookId: hook.id },
                  {
                    onSuccess: () => {
                      toast.success('Status alterado com sucesso');
                    },
                    onError: () => {
                      toast.error('Erro ao alterar status');
                    },
                  },
                );
              }}
            />
          </div>
        )}
        <FormHookMessageForm handleSubmit={handleSubmit} message={hook.message} />
        <ShowHooksVariables variables={hook.variables} />
      </TabsContent>
      {type === 'admin' && (
        <TabsContent className="grid gap-3" value="registerPhone">
          <ShowNumberAndGroups type="number" numbers={hook.phones} hookId={hook.id} />
          <ShowNumberAndGroups type="group" numbers={hook.gruopList} hookId={hook.id} />
          <div className="grid gap-2 mt-3">
            <p className="text-lg">Altere os números e grupos responsáveis</p>
            <FormSwapNumbers hookId={hook.id} />
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
}
