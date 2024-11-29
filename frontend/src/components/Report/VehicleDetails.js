import React from 'react';

export function VehicleDetails({ referenceNo }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Vehicle Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p><span className="font-medium">Reference Number:</span> {referenceNo}</p>
          <p><span className="font-medium">Inspection Date:</span> {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}