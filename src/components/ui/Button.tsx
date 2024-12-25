import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = 'py-2 px-4 rounded-lg border transition-colors';
  const variantStyles = {
    primary: 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700',
    outline: 'border-gray-300 text-gray-700 hover:border-purple-600'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}