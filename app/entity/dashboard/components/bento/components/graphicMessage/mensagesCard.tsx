'use client';

import MessageGraphic from '@/features/dashboard/components/bento/components/graphicMessage/messageGraphic';

export default function MessageCard({ data, isLoading }: any) {
  return (
    <MessageGraphic
      data={
        isLoading
          ? {
              chart: [],
            }
          : data
      }
      days={7}
    />
  );
}
