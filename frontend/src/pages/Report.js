import React, { useEffect, useState } from 'react';
import useInspectionStore from '../store/inspectionStore';
import { Header } from '../components/Header';
import { ImageFrame } from '../components/ImageFrame';
import { ReportHeader } from '../components/Report/ReportHeader';
import { VehicleDetails } from '../components/Report/VehicleDetails';
import { DamageDetailsTable } from '../components/Report/DamageDetailsTable';
import { TotalCost } from '../components/Report/TotalCost';
import { generatePDF } from '../utils/pdfGenerator';

export default function Report() {
  const { images, damageAnnotations } = useInspectionStore();
  const [totalCost, setTotalCost] = useState(0);
  const referenceNo = "IAR-5614005";

  useEffect(() => {
    const cost = damageAnnotations.reduce(
      (sum, annotation) => sum + (parseFloat(annotation.ActualCostRepair) || 0),
      0
    );
    setTotalCost(cost);
  }, [damageAnnotations]);

  const handleDownload = async () => {
    await generatePDF({
      images,
      damageAnnotations,
      referenceNo,
      totalCost
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header referenceNo={referenceNo} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ReportHeader 
            onDownload={handleDownload}
            onPrint={() => window.print()}
          />

          <VehicleDetails referenceNo={referenceNo} />

          {/* Images with Damage Markings */}
          <div className="space-y-8">
            {images.map((image, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Image {index + 1}</h3>
                <div id={`report-image-${index}`} className="relative">
                  <ImageFrame image={image} />
                </div>
                
                <DamageDetailsTable 
                  annotations={damageAnnotations.filter(
                    annotation => annotation.imageName === image.imageName
                  )}
                />
              </div>
            ))}
          </div>

          <TotalCost totalCost={totalCost} />
        </div>
      </main>
    </div>
  );
}