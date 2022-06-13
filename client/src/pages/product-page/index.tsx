/* eslint-disable no-console */
import React, { useEffect } from 'react';
import {
  Box, Typography, Container, Grid,
} from '@mui/material';
import Section from '../../components/section';
import ProductCard from '../../components/product-card/product-card';
import { useRootSelector } from '../../store';
import { selectProductsItems, selectProductsItemsLoading } from '../../store/selectors';
import { productFetchItemsAction } from '../../store/features/products/products-action-creators';
import { useRootDispatch } from '../../store/hooks';

const ProductsPage: React.FC = () => {
  const products = useRootSelector(selectProductsItems);
  const dispatch = useRootDispatch();

  useEffect(() => {
    dispatch(productFetchItemsAction);
  }, []);

  return (
    <Container sx={(theme) => theme.mixins.container}>
      <Typography
        component="h1"
        variant="h3"
        sx={{
          color: 'lightBlue.main',
        }}
      />

      <Section sx={(theme) => theme.mixins.section}>
        <>
          {products.map((product) => (
            <Grid key={product.id} item xs={4}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </>
      </Section>
    </Container>
  );
};

export default ProductsPage;
