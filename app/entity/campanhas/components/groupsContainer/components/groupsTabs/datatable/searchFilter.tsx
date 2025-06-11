'use client';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchFilter({ path }: any) {
  const router = useRouter();
  const [displayValue, setValue] = useState('');
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const searchParams = useSearchParams();

  const handleSearch = (event: any) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setValue(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(displayValue);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [displayValue]);

  useEffect(() => {
    const newURLWithParams = new URLSearchParams(window.location.search);
    if (debouncedInputValue) {
      newURLWithParams.set('search', debouncedInputValue);
    } else {
      newURLWithParams.delete('search');
    }
    router.push(`${path}?${newURLWithParams.toString()}`);
  }, [debouncedInputValue, path, router]);

  return (
    <Input
      type="search"
      value={displayValue}
      onChange={handleSearch}
      className="w-full"
      placeholder="Pesquisar..."
    />
  );
}
