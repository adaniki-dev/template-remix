import Pagination from '@/components/ui/Pagination';
import { useIntegrationInstanceByIdContext } from '@/features/integrations/components/IntegrationsDetails/integrationInstance/context';
import { useParams } from 'next/navigation';

export default function PaginationIntegrationInstance() {
  const params = useParams();
  const { queryIntegrationInstances } = useIntegrationInstanceByIdContext();
  const { data } = queryIntegrationInstances;
  return (
    <Pagination
      currentPage={data?.page}
      pagesSize={data?.pageSize}
      totalCount={data?.totalCount}
      typePageChange="params"
      onPageChange={{
        route: `/dashboard/integracoes/${params?.integrationId}/${params?.clientIntegrationId}/detalhes/instancias`,
        flattenParams: '',
      }}
    />
  );
}
