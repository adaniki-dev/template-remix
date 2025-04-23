'use client';

import React from 'react';
import { getHours } from '../../utils/dateHelpers';

export const TimeGrid = () => {
  const hours = getHours();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="relative grid grid-cols-[60px_1fr]">
        <div className="sticky top-0 z-10 bg-gray-50">
          {/* Time labels */}
          {hours.map((hour) => (
            <div key={hour} className="h-16 -mt-2 text-xs text-gray-500">
              {hour}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 border-l">
          {/* Time slots */}
          {Array(7)
            .fill(null)
            .map((_, dayIndex) => (
              <div key={dayIndex} className="border-r">
                {hours.map((hour) => (
                  <div key={hour} className="h-16 border-b" />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
