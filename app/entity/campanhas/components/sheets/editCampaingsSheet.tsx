'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { removeSearchParamsInURL } from '@/util/removeSearchParamsInURL';
import { useCampaignsContext } from '@/features/campanhas/context/campaignsContext';
import FormEditCampaigns from '@/features/campanhas/components/form/formEditCampaigns';

export default function EditCampaignsSheet() {
  const searchParams = useSearchParams();
  const EditCampaigns = searchParams.get('EditCampaigns');
  const [openModal, setOpenModal] = useState(false);
  const [campaign, setCampaign] = useState<any>(null);
  const { findCampaignById } = useCampaignsContext();

  useEffect(() => {
    if (EditCampaigns) {
      const campaign = findCampaignById(EditCampaigns);
      if (campaign) {
        setCampaign(campaign);
        setOpenModal(true);
      }
    }
  }, [EditCampaigns, setOpenModal]);

  function handleCloseModal() {
    removeSearchParamsInURL('EditCampaigns');
    setOpenModal(!openModal);
  }

  return (
    <Sheet open={openModal} onOpenChange={handleCloseModal}>
      <SheetContent className="min-w-[100vw] xl:min-w-[40vw] gap-4 flex flex-col">
        <SheetHeader>
          <SheetTitle>Edite sua campanha</SheetTitle>
          <SheetDescription>Edite sua campanhas.</SheetDescription>
        </SheetHeader>
        <FormEditCampaigns handleCloseModal={handleCloseModal} campaign={campaign} />
      </SheetContent>
    </Sheet>
  );
}
