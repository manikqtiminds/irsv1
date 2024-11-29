import React from 'react';

export function TotalCost({ totalCost }) {
  return (
    <div className="mt-8 border-t pt-4">
      <div className="flex justify-end">
        <div className="bg-blue-50 px-6 py-3 rounded-lg">
          <span className="text-blue-700 font-medium">Total Cost: </span>
          <span className="text-blue-700 font-bold">₹{totalCost.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}