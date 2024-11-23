// FileUpload.jsx
import React, { useState } from 'react';

const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };



  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors
        ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="hidden"
        id="fileInput"
        multiple
      />
      <label 
        htmlFor="fileInput"
        className="cursor-pointer flex flex-col items-center"
      >
        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <p className="text-sm text-gray-600">Drop files here or click to upload</p>
        <p className="text-xs text-gray-400 mt-1">PDF, Excel, and Image files supported</p>
      </label>
    </div>
  );
};

export default FileUpload;