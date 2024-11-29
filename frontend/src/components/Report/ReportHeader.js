import React from 'react';
import { Download, Printer } from 'lucide-react';

export function ReportHeader({ onDownload, onPrint }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Vehicle Inspection Report</h1>
      <div className="flex gap-4">
        <button
          onClick={onDownload}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </button>
        <button
          onClick={onPrint}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print
        </button>
      </div>
    </div>
  );
}