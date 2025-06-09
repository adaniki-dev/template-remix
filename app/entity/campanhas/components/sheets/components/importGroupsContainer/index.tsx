'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DataTableImportsGroupsSheet from '@/features/campanhas/components/sheets/components/importGroupsContainer/table/datatable';
import extractWhatsAppNumbers from '@/util/extractWhatsAppNumbers';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function ImportGroupsContainer({ data }: any) {
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
          Contém {data && 'data' in data && data.data?.length ? `${data.data.length}` : '0'} grupos
          nesse número
        </CardDescription>
      </CardHeader>
      {openTable && (
        <CardContent>
          <DataTableImportsGroupsSheet
            data={data.data}
            instanceKey={data.key}
            setIsImported={setIsImported}
            setOpenTable={setOpenTable}
          />
        </CardContent>
      )}
    </Card>
  );
}
