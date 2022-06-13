import {
  Card, Typography, Button, Box,
} from '@mui/material';
import React from 'react';
import { AddShoppingCart } from '@mui/icons-material';
import { NumberPicker } from 'react-widgets/cjs';
import Product from '../../types/products';
import Img from '../img';
import 'react-widgets/styles.css';
import { useRootDispatch } from '../../store/hooks';
import { createAddToCartAction, createCartUpdateItemAction } from '../../store/features/cart/cart-action-creators';

type ProductCardProps = Product;

const ProductCard: React.FC<ProductCardProps> = ({
  id, name, category, price, image, itemId, amount,
}) => {
  const dispatch = useRootDispatch();

  const addToCart = (): void => {
    const updateCartItemAction = createCartUpdateItemAction(id, itemId, amount);
    dispatch(updateCartItemAction);
    const addCartAddItemAction = createAddToCartAction(id, itemId, amount);
    dispatch(addCartAddItemAction);
  };

  return (

    <Card sx={(theme) => theme.mixins.box}>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        {`${name}`}
      </Typography>
      <Img src={image[0]} sx={{ height: 200, width: '100%' }} alt="" />
      <Typography variant="h6" component="p">
        {`${category}`}
      </Typography>
      <Typography variant="body1">{`${price}`}</Typography>
      <Box sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2,
      }}
      >
        {/* <Box sx={{ width: '70px' }}>
          <NumberPicker defaultValue={1} min={1} max={5} />
        </Box> */}
        <Button variant="contained" color="primary" sx={{ display: 'flex', gap: 3 }} onClick={addToCart}>
          <AddShoppingCart />
          Add to cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
