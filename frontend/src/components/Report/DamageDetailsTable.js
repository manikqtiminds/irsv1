import React from 'react';

export function DamageDetailsTable({ annotations }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Part</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Damage Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {annotations.map((annotation, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4 whitespace-nowrap">{annotation.partName || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {['Scratch', 'Dent', 'Broken'][annotation.DamageTypeID]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {['Repair', 'Replace'][annotation.RepairReplaceID]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">₹{annotation.ActualCostRepair || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}