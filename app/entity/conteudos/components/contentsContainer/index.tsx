import { TableContents } from '@/features/conteudos/components/contentsContainer/datatable';
import ContentsHeader from '@/features/conteudos/components/contentsContainer/headerContents';

export default function ContentsContainer() {
  return (
    <div className="grid w-full overflow-hidden lg:grid-rows-[56px_1fr] p-4 gap-4">
      <ContentsHeader />
      <TableContents />
    </div>
  );
}
