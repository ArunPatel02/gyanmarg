import React, { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'default';
}
const Button = ({
  children,
  className = '',
  variant = 'default',
  ...props
}: Props) => {
  let col = 'bg-zinc-700';
  if (variant === 'primary') col = 'bg-blue-500 ';
  return (
    <button
      className={`${col} hover:opacity-90 py-2 px-4 shadow-md rounded-lg font-bold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
