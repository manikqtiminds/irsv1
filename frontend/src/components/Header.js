import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Header({ referenceNo }) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-6">
            <Link 
              to="/images" 
              className={`transition-colors ${
                location.pathname === '/images' 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Inspected Images
            </Link>
            <Link 
              to="/review-edit" 
              className={`transition-colors ${
                location.pathname === '/review-edit' 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Review & Edit
            </Link>
            <Link 
              to="/report" 
              className={`transition-colors ${
                location.pathname === '/report' 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Report Page
            </Link>
          </div>
          <div className="text-sm text-gray-500">
            Reference Number: <span className="font-medium">{referenceNo}</span>
          </div>
        </div>
      </nav>
    </header>
  );
}