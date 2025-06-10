import ContentsContainer from '@/features/conteudos/components/contentsContainer';
import { ContentsSheetProviders } from '@/modules/contents/context/contentsProvider/context';

export function ContentPage() {
  return (
    <ContentsSheetProviders>
      <ContentsContainer />
    </ContentsSheetProviders>
  );
}
