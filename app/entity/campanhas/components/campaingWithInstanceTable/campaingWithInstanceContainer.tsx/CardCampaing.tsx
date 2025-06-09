import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaPaperPlane } from 'react-icons/fa';
import formatarData from '@/util/formatDate';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import toast from '@/lib/Toast/toast';

export function CardCampaigns({ data }: any) {
  const router = useRouter();

  const copyToClipboard = async (message: string) => {
    toast.info('Copiado para a área de transferência');
    await navigator.clipboard.writeText(message);
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex w-full justify-between">
          {data.title}{' '}
          <span className="text-sm font-normal">
            Limite de Grupos: {data.totalGroups}/{data.limitGroups}
          </span>
        </CardTitle>
        <div className="flex items-center justify-between gap-6">
          <div className="flex gap-6">
            {data.startedIn && (
              <p className="text-sm text-gray-500">Iniciado em {formatarData(data.startedIn)}</p>
            )}
            {data.finishedAt && (
              <p className="text-sm text-gray-500">Finalizado em {formatarData(data.finishedAt)}</p>
            )}
            {!data.finishedAt && <p className="text-sm text-gray-500">Recorrente</p>}
          </div>
          <Button onClick={() => copyToClipboard(data.link)}>
            Link de Compartilhamento <FaPaperPlane className="text-lg text-white ml-2" />
          </Button>
        </div>
        <CardDescription>
          Contém {data.instances?.length ? data.instances?.length : '0'} instâncias
          <br />
          Descrição: {data.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Button onClick={() => router.push(`/dashboard/campanhas/${data.id}`)} variant="outline">
          Visualizar minha campanha
        </Button>
      </CardContent>
    </Card>
  );
}
