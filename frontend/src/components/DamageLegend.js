import React from 'react';
import { DamageTypeIndicator } from './DamageTypeIndicator';

export function DamageLegend() {
  const damageTypes = [
    { type: 0, label: 'Scratch' },
    { type: 1, label: 'Dent' },
    { type: 2, label: 'Broken' }
  ];

  return (
    <div className="flex items-center justify-center gap-6 p-3 bg-gray-50 rounded-lg">
      {damageTypes.map(({ type, label }) => (
        <div key={type} className="flex items-center gap-2">
          <DamageTypeIndicator type={type} showLabel={true} />
        </div>
      ))}
    </div>
  );
}