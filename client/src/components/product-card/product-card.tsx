import {
  Card, Typography, Button, Box,
} from '@mui/material';
import React from 'react';
import { AddShoppingCart } from '@mui/icons-material';
import { ProductPopulated } from '../../types/products';
import Img from '../img';
import 'react-widgets/styles.css';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { selectAuthLoggedIn } from '../../store/features/auth/auth-selectors';
import { createCartAddItemAction } from '../../store/actions-creators';
import { CartItemPopulated } from '../../types/cart-item-populated';

type ProductCardProps = ProductPopulated;

const ProductCard: React.FC<ProductCardProps> = ({
  name, price, image,
}) => {
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const dispatch = useRootDispatch();
  const handleAddToCart = (cartItem: CartItemPopulated) => {
    const createProductAction = createCartAddItemAction(cartItem);
    dispatch(createProductAction);
  };
  return (

    <Card sx={(theme) => theme.mixins.box}>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        {`${name}`}
      </Typography>
      <Img src={image[0]} sx={{ height: 200, width: '100%' }} alt="" />
      <Typography variant="body1">{`${price}€`}</Typography>
      <Box sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2,
      }}
      >
        {
        !loggedIn
          ? (
            <Typography>
              To buy this product you have to be Logged In
            </Typography>
          )
          : loggedIn

        && (
          <Button
            variant="contained"
            color="primary"
            sx={{ display: 'flex', gap: 3 }}
            onClick={() => handleAddToCart}
          >
            <AddShoppingCart />
            Add to cart
          </Button>
        )
        }

      </Box>
    </Card>
  );
};

export default ProductCard;
