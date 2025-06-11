import InstanciasHomesHeader from '@/features/campanhas/components/instancesContainer/components/instanciasHomeHeader';
import InstancesTabs from './components/instanceTable/datatable';
import { DialogShowQRcode } from '@/features/instancia/components/dialogs/qrCodeDialog';
import { SuspenseWrapper } from '@/components/SuspenseWrapper';

export default function InstancesContainer() {
  return (
    <div className="grid w-full overflow-hidden lg:grid-rows-[56px_1fr] p-4 gap-4">
      <SuspenseWrapper modal={DialogShowQRcode} />
      <InstanciasHomesHeader />
      <InstancesTabs />
    </div>
  );
}
