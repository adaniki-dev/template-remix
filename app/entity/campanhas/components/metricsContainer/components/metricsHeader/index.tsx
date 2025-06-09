'use client';

import { FilterMetricsPopover } from '@/features/campanhas/components/metricsContainer/components/metricsHeader/filterMetricsPopover';

export default function MetricsHomeHeader() {
  return (
    <header className="flex h-14 items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <p className="text-base font-medium">Campanha Analítica</p>
        {/* <FilterMetricsPopover /> */}
      </div>
    </header>
  );
}
