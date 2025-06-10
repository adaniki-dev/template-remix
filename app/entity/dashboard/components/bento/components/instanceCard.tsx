'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaRegCheckCircle } from 'react-icons/fa';
import { VscError } from 'react-icons/vsc';
import { FaPaperclip } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function InstanceCard({ data }: any) {
  const router = useRouter();
  const quantityActiveInstance = data?.filter((instance: any) => instance.isEnabled)?.length || [];
  const quantityInactiveInstance =
    data?.filter((instance: any) => !instance.isEnabled)?.length || [];
  const handleInstance = () => {
    router.push('/dashboard/instancia');
  };
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-base font-bold text-center">Instâncias</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col h-40 items-center justify-center p-4 bg-green-100 rounded-lg gap-5">
              <FaRegCheckCircle className="w-52 h-52 text-green-600 " />
              <span className="text-2xl font-bold text-green-700">
                {quantityActiveInstance?.length === 0 ? 0 : quantityActiveInstance}
              </span>
              <span className="text-sm text-green-600">Ativas</span>
            </div>
            <div className="flex flex-col h-40 items-center justify-center p-4 bg-red-100 rounded-lg gap-5">
              <VscError className="w-52 h-52 text-red-600" />
              <span className="text-xl font-bold text-red-700">
                {quantityInactiveInstance?.length === 0 ? 0 : quantityInactiveInstance}
              </span>
              <span className="text-sm text-red-600">Inativas</span>
            </div>
          </div>
        ) : (
          <div className="flex mt-2 flex-col items-center gap-3">
            <div className="rounded-full bg-blue-300 w-12 items-center justify-center flex h-12">
              <FaPaperclip className=" w-7 h-7 text-blue-200" />
            </div>
            <p>Nenhuma instância encontrada</p>
            <Button onClick={handleInstance}>Adicionar instância</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
