'use client';

import { PopoverAdvancedMetricsFilter } from '@/features/campanhas/components/metricsContainer/components/metricsHeader/advancedFilterMetrics';

export function FilterMetricsPopover() {
  return (
    <div className="flex gap-2">
      <PopoverAdvancedMetricsFilter />
    </div>
  );
}
