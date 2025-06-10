'use client';
import { PopoverAdvancedScheduleFilter } from '@/features/agendamento/components/schedulesContainer/components/createScheduling/advancedFilterSchedule';

export function FilterSchedulePopover() {
  return (
    <div className="flex gap-2">
      <PopoverAdvancedScheduleFilter />
    </div>
  );
}
