
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  style,
  ...props 
}) => {
  const baseStyles = 'px-6 py-2.5 rounded-sm font-semibold transition-all duration-300 text-sm tracking-wide focus:outline-none disabled:opacity-50';
  const variants = {
    primary: 'text-white hover:brightness-110 shadow-sm',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};
