import { ChannelByIdHeader } from '@/features/canais/components/channelByIdHeader';
import { ChannelProvider } from '@/features/canais/context/channelProvider/context';

export default function ChannelByIdLayout({ children }: any) {
  return (
    <ChannelProvider>
      <div>
        <ChannelByIdHeader />
        {children}
      </div>
    </ChannelProvider>
  );
}
