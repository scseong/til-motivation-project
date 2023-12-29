// Button.tsx

import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  btntype?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
  onClick?: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ btntype, disabled, onClick, text }) => {
  const buttonStyles = disabled ? styles.disabledButton : styles.ableButton;

  return (
    <button
      type={btntype}
      className={`${styles.submitBtn} ${buttonStyles}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
