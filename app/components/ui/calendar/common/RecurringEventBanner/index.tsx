import React from 'react';
import { CalendarEvent } from '../../types/calendar';

const recurrenceTypes = {
  daily: 'Diariamente',
  weekly: {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo',
  },
  monthly: 'Mensalmente',
  yearly: 'Anualmente',
};

// Função para formatar a recorrência
const formatRecurrence = (recurrence: any) => {
  if (!recurrence) return '';

  const recurrenceInfo = [];

  // Adiciona o horário se existir
  const time = recurrence.time || '';

  // Coleta todas as recorrências ativas
  if (recurrence.daily) {
    recurrenceInfo.push(recurrenceTypes.daily);
  } else {
    // Verifica dias da semana
    const weekDays = Object.entries(recurrenceTypes.weekly)
      .filter(([key]) => recurrence[key])
      .map(([_, label]) => label);

    if (weekDays.length > 0) {
      recurrenceInfo.push(weekDays.join(', '));
    }
  }

  // Adiciona recorrência mensal
  if (recurrence.monthly) {
    recurrenceInfo.push(recurrenceTypes.monthly);
  }

  // Adiciona recorrência anual
  if (recurrence.yearly) {
    recurrenceInfo.push(recurrenceTypes.yearly);
  }

  // Monta a string final
  const recurrenceText = recurrenceInfo.join(' + ');
  return time ? `${time} - ${recurrenceText}` : recurrenceText;
};

export const RecurringEventsBanner = ({ events, EventMenu }: any) => {
  const recurringEvents = events.filter((event: CalendarEvent) => event.isRecurring);

  if (recurringEvents.length === 0) return null;

  return (
    <div className="px-4 py-2 border-b bg-gray-50">
      <div className="text-sm font-medium text-gray-500 mb-2">Eventos Recorrentes</div>
      <div className="space-y-1">
        {recurringEvents.map((event: CalendarEvent) => (
          <div
            key={event.id}
            className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm border group"
          >
            <div className="flex items-center space-x-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: event.color || '#2196F3' }}
              />
              <span className="text-sm">{event.title}</span>
              <span className="text-xs text-gray-500">
                {formatRecurrence(event.original?.recurrence)}
              </span>
            </div>
            {EventMenu && (
              <div className="invisible group-hover:visible">
                <EventMenu event={event.original} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecurringEventsBanner;
