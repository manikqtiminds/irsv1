import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { DamageTypeIndicator } from '../DamageTypeIndicator';
import AnnotationEditor from './AnnotationEditor';
import apiUrl from '../../config/apiConfig';

export default function AnnotationList({
  damageAnnotations,
  carParts,
  referenceNo,
  imageName,
  fetchDamageAnnotations,
}) {
  const [addingNew, setAddingNew] = useState(false);
  const [editingAnnotation, setEditingAnnotation] = useState(null);
  const [filter, setFilter] = useState('All');

  const totalCost = damageAnnotations.reduce(
    (sum, annotation) => sum + (parseFloat(annotation.ActualCostRepair) || 0),
    0
  );

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/damageannotations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete annotation');
      }

      // Refresh the damage annotations list
      await fetchDamageAnnotations(referenceNo, imageName);
    } catch (error) {
      console.error('Error deleting annotation:', error);
      // You might want to show an error message to the user here
    }
  };

  const filteredAnnotations = damageAnnotations.filter(annotation => {
    if (filter === 'All') return true;
    if (filter === 'Repair') return annotation.RepairReplaceID === 0;
    if (filter === 'Replace') return annotation.RepairReplaceID === 1;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header with Cost and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-blue-700 font-medium">Current Image Cost: </span>
            <span className="text-blue-700 font-bold">₹{totalCost.toFixed(2)}</span>
          </div>
          <button
            onClick={() => setAddingNew(true)}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Damage
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        {['All', 'Repair', 'Replace'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === type
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Editor or Table */}
      {addingNew || editingAnnotation ? (
        <AnnotationEditor
          annotation={editingAnnotation}
          carParts={carParts}
          referenceNo={referenceNo}
          imageName={imageName}
          fetchDamageAnnotations={fetchDamageAnnotations}
          isNew={addingNew}
          onSave={() => {
            setAddingNew(false);
            setEditingAnnotation(null);
          }}
          onCancel={() => {
            setAddingNew(false);
            setEditingAnnotation(null);
          }}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Part Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Damage Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAnnotations.map((annotation) => (
                <tr key={annotation.MLCaseImageAssessmentId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {carParts.find(
                      (part) => part.CarPartMasterID === annotation.CarPartMasterID
                    )?.CarPartName || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <DamageTypeIndicator type={annotation.DamageTypeID} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      annotation.RepairReplaceID === 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {['Repair', 'Replace', 'NA'][annotation.RepairReplaceID]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{annotation.ActualCostRepair || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setEditingAnnotation(annotation)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(annotation.MLCaseImageAssessmentId)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}