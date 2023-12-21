// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  label: any;
  onClick: () => void;
  buttonClass?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick ,buttonClass}) => {
  return (
    <button
      className={buttonClass}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
