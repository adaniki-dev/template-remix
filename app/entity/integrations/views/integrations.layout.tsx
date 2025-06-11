import IntegrationsProviders from '../context/integrationContext/provider';
import SheetIntegrateIntegration from '../components/sheet/SheetIntegrateIntegration';
import ModalSuspenseWrapper from '@/components/modalSuspenseWrapper';
import SheetIntegrationsValideAndGuide from '../components/sheet/SheetIntegrationsValidadeAndGuide';

export default async function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return (
      <IntegrationsProviders>
        <ModalSuspenseWrapper>
          <SheetIntegrationsValideAndGuide />
        </ModalSuspenseWrapper>
        <ModalSuspenseWrapper>
          <SheetIntegrateIntegration />
        </ModalSuspenseWrapper>
        {children}
      </IntegrationsProviders>
  );
}
