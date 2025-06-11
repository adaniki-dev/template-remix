'use client';

import React, { useState } from 'react';
import AdminHeader from '../components/adminDetails/addAdminIntegration/adminHeader';

export default function AdminPage() {
  const [data, setData] = useState<any[]>([]);

  return (
    <div
      className="min-h-screen w-full overflow-y-auto p-4 gap-4"
      style={{ display: 'grid', gridTemplateRows: '1fr auto' }}
    >
      <AdminHeader data={data} setData={setData} />
      {data?.length === 0 ? (
        <div className="flex justify-center items center h-96 text-center">
          <p className="text-gray-500">
            Não tem nenhum telefone nessa integração! <br /> Por favor, adicione um número a
            integração.
          </p>
        </div>
      ) : null}
    </div>
  );
}
