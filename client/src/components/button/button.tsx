import { Button } from '@mui/material';
import React from 'react';

export type ButtonProps = {
  bgColor: string;
  textColor: string;
  children?: React.ReactNode;
};

const Btn: React.FC<ButtonProps> = ({ bgColor, textColor, children }) => (
  <Button variant="contained" style={{ backgroundColor: bgColor, color: textColor }}>
    {children}
  </Button>
);

export default Btn;
