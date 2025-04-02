import React from 'react';

type Size = 'xs' | 'sm' | 'md' | 'lg';
type Color = 'blue' | 'red' | 'green' | 'yellow';

interface CircularProgressProps {
  progress?: number;
  size?: Size;
  color?: Color;
}

const sizeClasses: Record<Size, string> = {
  xs: 'w-12 h-12',
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
};

const colorClasses: Record<Color, string> = {
  blue: 'text-blue-500',
  red: 'text-red-500',
  green: 'text-green-500',
  yellow: 'text-yellow-500',
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress = 0,
  size = 'md',
  color = 'blue',
}) => {
  const circumference = 2 * Math.PI * 45; // 45 is the radius of the circle
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="bg-primary/20"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className={`text-primary transition-all duration-300 ease-in-out`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default CircularProgress;
