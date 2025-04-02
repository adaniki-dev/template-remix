'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { Edit, Plus, Save, Send, Share, Trash } from 'lucide-react';
import { useState, useEffect } from 'react';

type RadialButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
  index: number;
  total: number;
  isOpen: boolean;
};

const RadialButton = ({ icon, onClick, label, index, total, isOpen }: RadialButtonProps) => {
  // Limitar os ângulos para o quadrante superior esquerdo (90° a 180°)
  // Transformando o intervalo de 0 a 1 para o intervalo de π/2 (90°) a π (180°)
  const angle = Math.PI * 3 + (index / (total - 1)) * (Math.PI / 2);
  const x = Math.cos(angle);
  const y = Math.sin(angle);

  const delay = isOpen ? `${index * 50}ms` : '0ms';

  const distance = 120;
  const adjustedX = x * distance;
  const adjustedY = y * distance;

  return (
    <div
      className="absolute flex items-center justify-center rounded-full w-12 h-12 bg-secondary text-primary shadow-xl cursor-pointer hover:scale-110"
      style={{
        transform: isOpen ? `translate(${adjustedX}px, ${adjustedY}px)` : 'translate(0, 0)',
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? '1' : '0.5',
        transition: `transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease, scale 500ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
        transitionDelay: delay,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{icon}</TooltipTrigger>
          <TooltipContent sideOffset={16}>{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export function RadialMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      setAnimationClass('animate-pulse');
      setTimeout(() => setAnimationClass(''), 600);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const radialButtons = [
    {
      icon: <Send />,
      onClick: () => handleAddSearchParamsToUrl('contentMode', 'y'),
      label: 'Enviar Conteúdo',
    },
    {
      icon: <Edit />,
      onClick: () => handleAddSearchParamsToUrl('CreateContents', 'y'),
      label: 'Criar Conteúdo',
    },
  ];

  return (
    <div
      className="fixed bottom-8 right-8 flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className={`flex items-center justify-center p-3 rounded-full w-14 h-14 shadow-xl focus:outline-none z-20 ${animationClass} ${
          isOpen ? 'bg-secondary' : 'bg-secondary'
        }`}
        style={{
          transition:
            'background-color 300ms ease, transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
        onClick={(e) => {
          e.stopPropagation();
          toggleMenu();
        }}
      >
        <Plus className={`w-8 h-8 ${isOpen ? 'text-primary' : 'text-primary'}`} />
      </button>

      <div className="absolute">
        {radialButtons.map((button, index) => (
          <RadialButton
            key={index}
            icon={button.icon}
            onClick={button.onClick}
            label={button.label}
            index={index}
            total={radialButtons.length}
            isOpen={isOpen}
          />
        ))}
      </div>
    </div>
  );
}
