// Layout.jsx
import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { DocumentTextIcon, CubeIcon, UsersIcon, XIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { setInvoices, setProducts, setCustomers } from '../redux/fileSlice';
import axios from 'axios';

const Layout = () => {
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    const validTypes = ['application/pdf', 'application/vnd.ms-excel', 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
      'image/jpeg', 'image/png'];
    
    const validFiles = newFiles.filter(file => validTypes.includes(file.type));

    if (validFiles.length !== newFiles.length) {
      alert('Some files were rejected. Only PDF, Excel, and Images are allowed.');
    }

    setFiles(prevFiles => [...prevFiles, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const updateProcessingStatus = async () => {
    const statuses = [
      'Processing files...',
      'Extracting data...',
      'Getting invoice details...',
      'Getting customer information...',
      'Getting product details...',
      'Almost done...'
    ];

    for (let i = 0; i < statuses.length; i++) {
      setProcessingStatus(statuses[i]);
      await new Promise(resolve => setTimeout(resolve, 4500)); // Wait 3.5 seconds between status updates
    }
  };

  const uploadFiles = async () => {
    if (files.length === 0) {
      alert('Please select files to upload');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      // Start showing processing status messages
      updateProcessingStatus();

      // Upload the files to the backend
      const response = await axios.post('https://swipe-invoice-backend.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });
      console.log(response.data.geminiResponse);
      const parsedData = JSON.parse(response.data.geminiResponse);

      const { customers, invoices, products } = parsedData;

      // Dispatch actions to update Redux state
      dispatch(setCustomers(customers));
      dispatch(setInvoices(invoices));
      dispatch(setProducts(products));

      // Reset states after successful upload
      setFiles([]);
      setUploadProgress(0);
      setProcessingStatus('Upload completed successfully!');
      
      // Clear the success message after 3 seconds
      setTimeout(() => {
        setProcessingStatus('');
        setIsUploading(false);
      }, 3000);

    } catch (error) {
      console.error('Error uploading files:', error);
      setProcessingStatus('Upload failed. Please try again.');
      
      setTimeout(() => {
        setProcessingStatus('');
        setIsUploading(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <svg className="w-8 h-8 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
          </svg>
          Automated Data Extraction and Invoice Management
        </h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
          <div
            className={`relative p-8 transition-all duration-300 ${
              isDragging ? 'bg-indigo-50' : 'bg-white'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
              multiple
              accept=".pdf,.xlsx,.xls,.png,.jpg,.jpeg"
            />
            <label
              htmlFor="fileInput"
              className={`relative block border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragging
                  ? 'border-indigo-400 bg-indigo-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex flex-col items-center">
                <svg
                  className={`w-12 h-12 mb-4 transition-colors duration-300 ${
                    isDragging ? 'text-indigo-500' : 'text-gray-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-base text-gray-700 font-medium">
                  Drop files here or click to upload
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  PDF, Excel, and Image files supported
                </p>
              </div>
            </label>

            {files.length > 0 && (
              <div className="mt-6">
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                      >
                        <XIcon className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>

                {isUploading && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      {processingStatus || `Uploading... ${uploadProgress}%`}
                    </p>
                  </div>
                )}

                <button
                  onClick={uploadFiles}
                  disabled={isUploading}
                  className={`mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                    ${
                      isUploading
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    }`}
                >
                  {isUploading ? 'Processing...' : 'Upload Files'}
                </button>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-1 inline-flex">
          <NavLink
            to="/invoices"
            className={({ isActive }) => `
              flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            <DocumentTextIcon className="w-5 h-5 mr-2" />
            <span>Invoices</span>
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) => `
              flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            <CubeIcon className="w-5 h-5 mr-2" />
            <span>Products</span>
          </NavLink>

          <NavLink
            to="/customers"
            className={({ isActive }) => `
              flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            <UsersIcon className="w-5 h-5 mr-2" />
            <span>Customers</span>
          </NavLink>
        </nav>

        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;