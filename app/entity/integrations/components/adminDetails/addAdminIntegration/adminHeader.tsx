import { useState } from 'react';
import { Button } from '@/components/ui/button';
import AdminTelephone from '@/features/integrations/components/adminDetails/addAdminIntegration/addAdminTelephone';
import TableAdmin from './tableAdmin/table.admin';

export default function AdminHeader({
  data,
  setData,
}: {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [showTable, setShowTable] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Função para mostrar a tabela
  const handleShowTable = () => {
    setShowTable(true);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Função para adicionar o telefone ao estado 'data'

  const handleAddTelephone = (telefone: string) => {
    setData((prevData) => [...prevData, { telefone }]); // Atualiza o estado com o telefone
    setShowTable(true);
    setOpenModal(false);
  };

  return (
    <div>
      <header className="flex h-14 lg:h-[60px] items-center justify-between gap-4">
        <div className=" grid grid-cols-[160px_1fr] items-center">
          <p className="text-base font-medium whitespace-nowrap">Configurações administrativas</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleOpenModal}
            className="hover:bg-blue-400 hover:transition-all duration-300"
          >
            Adicionar Telefone
          </Button>
        </div>
      </header>

      <AdminTelephone
        openModal={openModal}
        onCloseModal={handleCloseModal}
        onConfirm={handleAddTelephone} // Passando a função para adicionar o telefone
      />

      {showTable && (
        <div className="mt-4 w-full">
          <TableAdmin data={data} />
        </div>
      )}
    </div>
  );
}
