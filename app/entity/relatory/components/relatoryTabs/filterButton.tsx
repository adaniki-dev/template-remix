'use client';
import { Button } from '@/components/ui/button';
import { useDashboardContext } from '../../../relatory/context/dashboardContext';
import { MdFilterList } from 'react-icons/md';
export default function FilterButton() {
  const { handleAddSearchParamsToUrl } = useDashboardContext();
  return (
    <Button
      className="flex gap-2"
      variant="outline"
      onClick={() => handleAddSearchParamsToUrl('filter', 'open')}
    >
      Filtros <MdFilterList />
    </Button>
  );
}
