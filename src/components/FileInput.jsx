// FileInput.jsx
import React from 'react';

const FileInput = ({ label, error, onChange, accept = 'image/*' }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-white mb-1 text-sm">{label}</label>}
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files[0])}
        className={`block w-full text-sm text-gray-300
          file:mr-4 file:py-2 file:px-4 file:rounded
          file:border-0 file:text-sm file:font-semibold
          file:bg-purple-500 file:text-white hover:file:bg-purple-900 border border-purple-500 rounded-lg hover:border-purple-900
          ${error ? 'border border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FileInput;
