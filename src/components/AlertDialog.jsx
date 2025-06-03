// src/components/AlertDialog.jsx
import React from 'react';

const AlertDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Yes",
  cancelText = "Cancel",
  type = "confirm", // confirm, success, error, info
}) => {
  if (!isOpen) return null;

  const typeColors = {
    confirm: 'text-yellow-800',
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm mx-4">
        <h2 className={`text-lg font-semibold mb-2 ${typeColors[type]}`}>
          {title}
        </h2>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-4 rounded"
            onClick={onClose}
          >
            {cancelText}
          </button>
          {type === 'confirm' && (
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-4 rounded"
              onClick={() => {
                onConfirm?.();
                onClose?.();
              }}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
