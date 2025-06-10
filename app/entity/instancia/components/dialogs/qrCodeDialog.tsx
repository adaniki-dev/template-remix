'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdError } from 'react-icons/md';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { LuRefreshCcw } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { useSocket } from '@/providers/socketProvider';
import cleanToDigits from '@/util/cleanToDigits';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';
import { useApiQuery } from '@/core/useAPI';

export function DialogShowQRcode() {
  const searchParams = useSearchParams();
  const instanceId = searchParams.get('instanceId') as string;
  const provider = searchParams.get('provider') as string;
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { phoneConnected, setPhoneConnected } = useSocket();
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    if (instanceId) {
      setOpenDialog(true);
    }
  }, [instanceId]);

  const handleRemoveSearchParamsVariant = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('instanceId');
    searchParams.delete('provider');
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
  }, []);

  const autonotifyQuery = useApiQuery<any>(
    ['instance', instanceId, provider],
    `/sessions/${instanceId}`,
    {
      enabled: provider === 'autonotify',
    },
  );

  const { data, isLoading, isError, refetch, isRefetching } = autonotifyQuery;

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    setPhoneConnected(null);
    handleRemoveSearchParamsVariant();
  }, [handleRemoveSearchParamsVariant]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (openDialog && !isLoading && !isError) {
      setTimeLeft(20);
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalId);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [openDialog, isLoading, isError, data]);

  const resetQuery = useCallback(() => {
    refetch();
    setTimeLeft(20);
  }, [instanceId]);

  return (
    <Sheet open={openDialog} onOpenChange={handleCloseDialog}>
      <SheetContent>
        <SheetHeader className="mb-9">
          <SheetTitle>QR Code</SheetTitle>
          <SheetDescription>Scaneie com o QR Code do whatsapp</SheetDescription>
        </SheetHeader>

        {(isLoading || isRefetching) && (
          <Card>
            <CardContent>
              <div className="flex flex-col gap-3 items-center justify-center py-6">
                <AiOutlineLoading3Quarters className="animate-spin text-4xl text-primary" />
                <p>Carregando sua instancia</p>
              </div>
            </CardContent>
          </Card>
        )}
        {isError && (
          <Card>
            <CardContent>
              <div className="flex flex-col gap-3 items-center justify-center py-6">
                <MdError className="text-4xl text-red-500" />
                <p>Erro ao carregar sua instancia</p>
              </div>
            </CardContent>
          </Card>
        )}
        {!phoneConnected && openDialog && data && !isLoading && !isError && !isRefetching && (
          <Card>
            <CardContent>
              <div className="py-6">
                <Image width={300} height={300} src={data.base64} alt="QR Code" />
              </div>
              <div className="flex gap-4 border items-center justify-between px-4 py-2 rounded-md shadow-sm">
                {timeLeft > 0 && <p>Duração do QRCode: {timeLeft}</p>}
                {timeLeft === 0 && <p>Atualize o QRCode</p>}
                <Button disabled={timeLeft > 0} onClick={resetQuery}>
                  <LuRefreshCcw />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        {phoneConnected && openDialog && (
          <Card>
            <CardContent>
              <div className="flex items-center flex-col">
                <div className="flex flex-col gap-3 items-center justify-center py-6">
                  <p className="text-green-500 text-lg">Telefone conectado com sucesso!</p>
                </div>
                <Image
                  className="rounded-full shadow-lg"
                  width={120}
                  height={120}
                  src={phoneConnected?.profilePicture}
                  alt="profileImage"
                />

                <div className="mt-4">
                  {phoneConnected?.phone && (
                    <p>{formatPhoneNumber(cleanToDigits(phoneConnected?.phone))}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </SheetContent>
    </Sheet>
  );
}
