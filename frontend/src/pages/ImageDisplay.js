import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useInspectionStore from "../store/inspectionStore";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { ImageThumbnails } from "../components/ImageThumbnails";
import { ImageFrame } from "../components/ImageFrame";

export default function ImageDisplay() {
  const {
    images,
    currentImageIndex,
    setCurrentImageIndex,
    fetchImages,
    loading,
    error,
  } = useInspectionStore();

  const navigate = useNavigate();
  const referenceNo = "IAR-5614005";
  const containerRef = useRef(null);

  useEffect(() => {
    fetchImages(referenceNo);
  }, [fetchImages, referenceNo]);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrevious = (e) => {
    e.stopPropagation(); // Prevent event from bubbling to container
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation(); // Prevent event from bubbling to container
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleMainImageClick = () => {
    navigate("/review-edit");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  const currentImg = images[currentImageIndex];

  if (!currentImg || !currentImg.imageDimensions) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">No images available for assessment</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header referenceNo={referenceNo} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Section Title */}
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Vehicle Inspection Images
          </h2>

          {/* Thumbnails Section */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Image Gallery
            </h3>
            <ImageThumbnails
              images={images}
              currentImageIndex={currentImageIndex}
              onThumbnailClick={handleThumbnailClick}
            />
          </div>

          {/* Main Image Section */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Selected Image Preview
            </h3>
            <div 
              ref={containerRef}
              className="relative bg-black rounded-xl overflow-hidden flex items-center justify-center cursor-pointer"
              style={{ height: '70vh' }}
              onClick={handleMainImageClick}
            >
              <ImageFrame image={currentImg} />

              {/* Navigation Buttons */}
              <button
                onClick={handlePrevious}
                disabled={currentImageIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 disabled:opacity-30 p-2 rounded-full transition-all focus:outline-none"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              
              <button
                onClick={handleNext}
                disabled={currentImageIndex === images.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 disabled:opacity-30 p-2 rounded-full transition-all focus:outline-none"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Click to Edit Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/75 text-white px-4 py-2 rounded-full text-sm">
                Click to edit image
              </div>
            </div>

            {/* Image Counter */}
            <div className="mt-4 text-center text-gray-600">
              Image {currentImageIndex + 1} of {images.length}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}