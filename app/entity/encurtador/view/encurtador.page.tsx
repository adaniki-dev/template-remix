'use client';

import Image from 'next/image';
import developerFeature from '@/public/images/developerFeature.svg';
import { FaGears } from 'react-icons/fa6';

export default function EncurtadorDeLinkPage() {
  return (
    <div className="flex flex-col items-center bg-transparent w-full gap-5">
      <Image src={developerFeature} alt="development" width="400" height="200" priority={true} />
      <div className="flex flex-row gap-3">
        <p className="text-2xl font-bold">Em desenvolvimento</p>
        <FaGears className="text-primary text-3xl" />
      </div>
    </div>
  );
}
