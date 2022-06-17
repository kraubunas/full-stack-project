/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import {
  Box, Typography, Container, Grid,
} from '@mui/material';
import Section from '../../components/section';
import { useRootSelector } from '../../store';
import { selectProductsItems, selectProductsItemsLoading } from '../../store/selectors';
import { productFetchItemsActionThunk } from '../../store/features/products/products-action-creators';
import { useRootDispatch } from '../../store/hooks';
import DeleteUpdateProducts from '../../components/product-card/product-card-delete-update';

const UpdateProductsPage: React.FC = () => {
  const products = useRootSelector(selectProductsItems);
  const dispatch = useRootDispatch();

  useEffect(() => {
    dispatch(productFetchItemsActionThunk);
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
          {products?.map((product) => (
            <Grid key={product.id} item xs={4}>
              <DeleteUpdateProducts {...product} />
            </Grid>
          ))}
        </>
      </Section>
    </Container>
  );
};

export default UpdateProductsPage;
