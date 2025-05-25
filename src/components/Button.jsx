import React from 'react'

function Button({
    children,
    type ='button',
    bgColor='bg-purple-600',
    textColor = 'text-white',
    hoverbgColor = 'hover:bg-purple-900',
    className = '',
    onClick,
    ...props    
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${bgColor} ${className} ${hoverbgColor}`} onClick={onClick}{...props} >
        {children}
      </button>
  )
}

export default Button