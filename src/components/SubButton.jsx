import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { toggleSidebar } from '../../store/sideBarSlice';

function SubButton({ 
    label,
    icon, 
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
          <button
           className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:scale-105 hover:shadow-xl${bgColor} ${bgColor} ${className} ${hoverbgColor}`} onClick={onClick}{...props} 
            
          >
            <span className="text-lg">{icon}</span>
            
            <span className="text-sm md:text-base">{label}</span>
            
          </button>
        
    
  );
}

export default SubButton;
