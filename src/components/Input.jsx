import React, { forwardRef, useId } from 'react';

const Input = forwardRef(function Input(
  {
    label = '',
    type = 'text',
    className = '',
    autoComplete = 'off',
    error = '',
    placeholder="",
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className="w-full ">
      {label && (
        <label htmlFor={id} className="block text-sm text-white mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`px-3 py-2  bg-gray-800 outline-none focus:bg-gray-700 w-full border
          border-purple-500 rounded-lg hover:border-purple-900 ${error ? 'border border-red-500' : ''}
          ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

export default Input;
