import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function EventTooltip({ EventMenu, message, event }: any) {
  const changeName = (name: string) => {
    switch (name) {
      case 'pending':
        return 'Pendente';
      case 'processing':
        return 'Processando';
      case 'completed':
        return 'Enviado';
      case 'failed':
        return 'Falha ao enviar';
      case 'recurrence':
        return 'Recorrência';
      default:
        return '';
    }
  };

  const messages = (message: any) => {
    if (Array.isArray(message)) {
      return message.map((msg: string, index: number) => <p key={index}>{msg}</p>);
    } else {
      return message;
    }
  };

  return (
    <div className="w-full">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-full">
            <div
              className="text-xs group max-w-48 rounded-sm p-2 flex justify-between overflow-hidden text-ellipsis whitespace-nowrap items-center mb-1 rounded-r-none truncate"
              style={{
                backgroundColor: event?.color,
                color: '#fff',
              }}
            >
              <span className="truncate max-w-full">{event.title}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-black border">
            <div className="flex flex-col items-center">
              {messages([event?.original?.exactTime, changeName(event?.status)])}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
