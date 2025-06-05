'use client';

import { useApiQuery } from '@/core/useAPI';
import { useSearchParams } from 'next/navigation';
import { CiCalendar } from 'react-icons/ci';
import { TbClockHour3 } from 'react-icons/tb';
import { BiError } from 'react-icons/bi';
import { SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';

export default function DetailsAgendament() {
  const searchParams = useSearchParams();
  const id = searchParams.get('shceduleId');

  const { data, isLoading, isError } = useApiQuery<any>(
    ['schedules/messagesDetails'],
    `schedules/messages?id=${id}`,
  );

  const groups = data?.groups || [];

  return (
    <div className="mt-5 space-y-5">
      {isError && !data && (
        <div className="flex justify-center items-center">
          <Card className="w-full">
            <CardContent className="h-36 flex flex-col items-center space-y-3 justify-center">
              <BiError className="w-10 h-10" />
              <span>Erro ao carregar dados</span>
            </CardContent>
          </Card>
        </div>
      )}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6 flex flex-col items-center">
            <div className="bg-gray-100 p-3 rounded-full mb-4">
              <CiCalendar className="h-6 w-6 text-gray-600" />
            </div>
            <p className="text-sm text-gray-500 mb-2">Data</p>
            <p>{data?.sendDate}</p>
          </div>
          <div className="border rounded-lg p-6 flex flex-col items-center">
            <div className="bg-gray-100 p-3 rounded-full mb-4">
              <TbClockHour3 className="h-6 w-6 text-gray-600" />
            </div>
            <p className="text-sm text-gray-500 mb-2">Hora</p>
            <p>{data?.exactTime}</p>
          </div>
        </div>
      )}
      <div className="space-y-3">
        <SheetTitle>Grupos</SheetTitle>
        <SheetDescription className="">Grupos selecionados para envio</SheetDescription>
        {isError && !data && (
          <div className="flex justify-center items-center">
            <Card className="w-full">
              <CardContent className="h-36 flex flex-col items-center space-y-3 justify-center">
                <BiError className="w-10 h-10" />
                <span>Erro ao carregar dados</span>
              </CardContent>
            </Card>
          </div>
        )}
        <div className="overflow-y-auto h-[75vh]">
          {!isLoading && !isError && (
            <div className="grid gap-3">
              {groups.map((group: any) => (
                <div key={group.id}>
                  <Card className={`hover:bg-secondary`}>
                    <CardContent className="flex items-center gap-2 p-3">{group.name}</CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
