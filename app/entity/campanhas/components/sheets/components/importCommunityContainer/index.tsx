'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import extractWhatsAppNumbers from '@/util/extractWhatsAppNumbers';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import DataTableImportsCommunitySheet from './table/datatable';

export default function ImportCommunityContainer({ data, instanceId }: any) {
  const [openTable, setOpenTable] = useState(false);
  const [isImported, setIsImported] = useState(false);
  return (
    <Card
      className={`transition-all ease-linear duration-500 ${isImported ? 'bg-green-200/80' : ''}`}
    >
      <CardHeader onClick={() => setOpenTable(!openTable)}>
        <div className="flex justify-between">
          <CardTitle className="text-lg">
            {formatPhoneNumber(extractWhatsAppNumbers(data.phone))}
          </CardTitle>
          <ChevronDown
            className={`w-6 h-6 transition-all ease-linear duration-300 ${openTable ? 'transform rotate-180' : ''}`}
          />
        </div>
        <CardDescription>
          Contém {data && 'data' in data && data.data?.length ? `${data.data.length}` : '0'}{' '}
          comunidades nesse número
        </CardDescription>
      </CardHeader>
      {openTable && (
        <CardContent>
          <DataTableImportsCommunitySheet
            data={data.data}
            instanceId={instanceId}
            instanceKey={data.key}
            setIsImported={setIsImported}
            setOpenTable={setOpenTable}
          />
        </CardContent>
      )}
    </Card>
  );
}
