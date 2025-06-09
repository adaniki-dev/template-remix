'use client';
import CardTicket from '@/features/authSupport/components/tickedId/cardTicked';
import { useTicketByIdContext } from '@/features/authSupport/context/ticketIdContext';
import { CiWarning } from 'react-icons/ci';

export default function TicketById({ params }: any) {
  const { queryTicketById } = useTicketByIdContext();
  const { data, isLoading, isError } = queryTicketById;

  const replies = data?.replies?.reply ? data?.replies?.reply : [];

  return (
    <div>
      {isLoading && !data && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Buscando ticket...</p>
        </div>
      )}
      {!isError && data && (
        <div>
          <CardTicket
            reply={replies}
            subject={data?.subject}
            id={data?.id}
            deptname={data?.deptname}
            status={data?.status}
            priority={data?.priority}
            date={data?.date}
            lastreply={data?.lastreply}
          />
        </div>
      )}
      {isError && (
        <div className="w-full flex flex-col  justify-center h-[85vh]">
          <div className="w-full rounded-lg bg-white shadow-lg max-w-md mx-auto p-8">
            <div className="flex flex-col items-center justify-center gap-3 pt-6">
              <div className="rounded-full bg-blue-100 p-3 mb-4">
                <CiWarning className="text-red-500" />
              </div>
              <p className="text-gray-500">Erro ao buscar ticket</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
