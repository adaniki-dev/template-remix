import { Button } from '@/components/ui/button';
import { LockIcon } from 'lucide-react';
import Image from 'next/image';

export default function IntegrationsCardList({ name, src, isEnabled }: any) {
  return (
    <div>
      <Button
        variant="outline"
        className='h-24 w-full flex flex-col items-center justify-center text-center hover:bg-gray-100 transition-colors'
      >
        <div className="relative w-full">
          <div className={`absolute top-0 right-0 ${!isEnabled && 'bg-gray-100'} rounded-full p-1`}>
            {!isEnabled && <LockIcon className="w-4 h-4 text-gray-500" />}
          </div>
        </div>
        <Image className="text-2xl mb-2" width={32} height={32} alt={name} src={src} />
        <span className="text-sm md:text-base lg:text-lg text-center break-words w-full truncate" title={name}> {name} </span>
      </Button>
    </div>
  );
}
