'use client';
import { IoEllipsisVertical } from 'react-icons/io5';
import { MdOutlineQrCode } from 'react-icons/md';
import { LuCog } from 'react-icons/lu';
import { FaAndroid, FaApple, FaChevronDown } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function SidebarGuide() {
  const [selected, setSelected] = useState('Iphone');
  const options = ['Android', 'Iphone'];
  const handleSelect = (option: string) => {
    setSelected(option);
  };

  return (
    <div className="hidden border-r lg:block">
      <div className="flex flex-col gap-2">
        <div className="px-6 py-4 grid gap-6">
          <h1 className="text-lg">Guia basico de configuração</h1>
          <DropdownMenu>
            <DropdownMenuTrigger className="border border-primary rounded-md w-full" asChild>
              <Button variant="outline" className="justify-between">
                {selected === 'Android' && (
                  <span className="flex gap-2 items-center">
                    Android <FaAndroid className="h-4 w-4 inline" />
                  </span>
                )}
                {selected === 'Iphone' && (
                  <span className="flex gap-2 items-center">
                    Iphone <FaApple className="h-4 w-4 inline" />
                  </span>
                )}
                <FaChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              {options.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="w-full text-left px-4 py-2 hover:bg-muted"
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {selected === 'Android' && (
            <div className="grid gap-2 px-4">
              <ul className="text-sm grid gap-2 list-disc">
                <li>Acesse o seu WhatsApp</li>
                <li>
                  Clique nos <IoEllipsisVertical className="h-4 w-4 inline" /> no canto superior
                  direito
                </li>
                <li>Entre nas configurações</li>
                <li>
                  Clique no <MdOutlineQrCode className="h-4 w-4 inline" />
                </li>
                <li>Escaneie o QR Code</li>
              </ul>
            </div>
          )}
          {selected === 'Iphone' && (
            <div className="grid gap-2 px-4">
              <ul className="text-sm grid gap-2 list-disc">
                <li>Acesse o seu WhatsApp</li>
                <li>
                  Clique em <LuCog className="h-4 w-4 inline" /> no canto inferior direito
                </li>
                <li>
                  Clique no <MdOutlineQrCode className="h-4 w-4 inline" />
                </li>
                <li>Escaneie o QR Code</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
