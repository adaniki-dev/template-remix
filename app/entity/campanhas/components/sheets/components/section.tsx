import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  step: number;
  children: ReactNode;
  header?: ReactNode;
}

export const Section = ({ title, step, children, header }: SectionProps) => (
  <div className="flex flex-col w-full gap-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex w-8 h-8 p-2 bg-primary text-center justify-center items-center rounded-full text-white font-semibold">
          <p>{step}</p>
        </div>

        <h6 className="font-semibold ">{title}</h6>
      </div>
      {header}
    </div>
    <div className="bg-background p-4 rounded-lg">{children}</div>
  </div>
);
