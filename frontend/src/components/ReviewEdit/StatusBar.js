import React from 'react';

export function StatusBar({ currentIndex, total, imageName }) {
  return (
    <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
      <span className="text-sm text-gray-600">
        Image {currentIndex + 1} of {total}
      </span>
      <span className="text-sm font-medium text-gray-700">{imageName}</span>
    </div>
  );
}