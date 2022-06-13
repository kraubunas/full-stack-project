import React from 'react';
import { Box, Typography } from '@mui/material';

type Property = {
  name: string,
  value: string,
};

type ProductCardPropertiesProps = {
  properties: Property[];
};

const ProductCardProperties: React.FC<ProductCardPropertiesProps> = ({
  properties,
}) => (
  <Box>
    {properties.map(({ name, value }) => (
      <Typography key={name}>{`${name} : ${value}`}</Typography>
    ))}
  </Box>
);

export default ProductCardProperties;
