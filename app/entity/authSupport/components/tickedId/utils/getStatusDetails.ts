export const getStatusDetails = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return { color: 'bg-yellow-100 text-yellow-800', name: 'Aberto' };
      case 'answered':
        return { color: 'bg-blue-100 text-blue-800', name: 'Respondido' };
      case 'customer-reply':
        return { color: 'bg-green-100 text-green-800', name: 'Resposta do cliente' };
      case 'closed':
        return { color: 'bg-red-100 text-red-800', name: 'Fechado' };
      default:
        return { color: 'bg-gray-100 text-gray-800', name: 'Desconhecido' };
    }
  };
  