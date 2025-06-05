import { SuspenseWrapper } from '@/components/SuspenseWrapper';
import { TableChannels } from '@/features/canais/components/channelsContainer/datatable';
import ChannelsHeader from '@/features/canais/components/channelsHeader';
import AddChannelSheet from '@/features/canais/components/sheet/addChannelsSheet';
import EditChannelSheet from '@/features/canais/components/sheet/editChannelsSheet';
import { ChannelsProvider } from '@/features/canais/context/channelsProvider/context';

export default function ChannelsListPage() {
  return (
    <ChannelsProvider>
      <SuspenseWrapper modal={AddChannelSheet} />
      <SuspenseWrapper modal={EditChannelSheet} />
      <div className="flex flex-col w-full overflow-hidden p-4 gap-4">
        <ChannelsHeader />
        <TableChannels />
      </div>
    </ChannelsProvider>
  );
}
