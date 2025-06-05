'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

export default function SchedulingModal({ message }: any) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-1">{message}</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col flex-wrap justify-center items-start">
            <DialogTitle>Ver Agendamento</DialogTitle>
          </div>
        </DialogHeader>
        <div className="border border-gray rounded-md text-black p-4">
          <p className="whitespace-pre-wrap font-mono text-sm">{message}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
