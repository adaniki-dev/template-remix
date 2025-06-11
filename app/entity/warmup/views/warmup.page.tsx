import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import InstancesForm from '../components/forms/instancesForm';
import ButtonToStartWarmup from '@/features/warmup/components/handleWarmup/buttonToStartWarmup';

export default function ConfigPage() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-base font-semibold mb-3">
          Warmup <span className="rounded-full px-3 py-1 bg-yellow-400">BETA</span>
        </p>
        <ButtonToStartWarmup />
      </div>

      <div className="flex flex-col gap-8">
        <ConfigSection title="Ativar aquecimento de chip">
          <p className="text-sm">
            Proteja-se de bloqueios ativando o aquecimento de chip. Dessa forma você evita bloqueios
            do whatsapp devido a mensagens não usuais
          </p>
        </ConfigSection>

        <ConfigSection title="Instâncias disponíveis">
          <InstancesForm />
        </ConfigSection>

        <ConfigSection title="Diagnósticos">
          <p className="flex justify-center items-center text-gray-500">
            {' '}
            Diagnóstico em construção
          </p>
        </ConfigSection>
      </div>
    </div>
  );
}

const ConfigSection = (props: {
  title: string;
  children: React.ReactNode;
  headerComponentRight?: React.ReactNode;
}) => {
  return (
    <Card className="flex flex-col gap-4 p-6">
      <CardHeader className="m-0 flex flex-row justify-between items-center p-0">
        <h6 className="font-semibold">{props.title} </h6>
        {props.headerComponentRight && props.headerComponentRight}
      </CardHeader>
      <CardContent className="p-0">{props.children}</CardContent>
    </Card>
  );
};
