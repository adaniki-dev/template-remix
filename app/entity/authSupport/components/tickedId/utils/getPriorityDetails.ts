export const getPriorityDetails = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'height':
        return { color: 'bg-red-400 text-red-100', name: 'Alta' };
      case 'medium':
        return { color: 'bg-orange-100 text-orange-800', name: 'Média' };
      case 'low':
        return { color: 'bg-blue-100 text-blue-800', name: 'Baixa' };
      default:
        return { color: 'bg-gray-100 text-gray-800', name: 'Desconhecido' };
    }
  };
  