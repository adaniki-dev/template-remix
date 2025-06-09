import DataTableOrder from '../components/orders/table';
import { OrdersProviders } from '../context/faturaContext/provider';

export default async function FaturaPage(props: any) {
  return (
    <OrdersProviders>
      <div>
        <DataTableOrder />
      </div>
    </OrdersProviders>
  );
}
