'use client';

import React from 'react';
import { Button } from '@mui/material';

interface CustomButtonProps {
  onClick?: () => void;
  text: string;
  isTryButton?: boolean;
  href?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  text,
  isTryButton = false,
  href,
}) => {
  return (
    <Button
      onClick={onClick}
      href={href}
      variant="contained"
      sx={{
        borderRadius: '999px',
        px: 3,
        py: 1.4,
        fontSize: '0.95rem',
        fontWeight: 600,
        textTransform: 'none',
        backgroundColor: isTryButton ? '#7B61FF' : 'transparent',
        color: isTryButton ? '#fff' : '#fff',
        border: isTryButton ? 'none' : '4px solid #ffffff',
        boxShadow: isTryButton ? '0px 4px 12px rgba(123, 97, 255, 0.4)' : 'none',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          backgroundColor: isTryButton ? '#674FD8' : '#ffffff',
          color: isTryButton ? '#fff' : '#111',
          transform: 'translateY(-2px)',
          boxShadow: isTryButton
            ? '0px 6px 20px rgba(123, 97, 255, 0.5)'
            : '0px 4px 12px rgba(255,255,255,0.2)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
