import {
  Card, Typography, Button, Box, Container,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ProductPopulated } from '../../types/products';
import Img from '../img';
import 'react-widgets/styles.css';
import { useRootDispatch } from '../../store/hooks';
import ProductCardUpdate from './product-card-update';
import { productDeleteProductAction } from '../../store/actions-creators';

type ProductCardProps = ProductPopulated;

const DeleteUpdateProducts: React.FC<ProductCardProps> = ({
  id, name, categoryIds, price, image,
}) => {
  const dispatch = useRootDispatch();
  const navigate = useNavigate();

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
    const deleteProductAction = productDeleteProductAction(id);
    dispatch(deleteProductAction);
    navigate('/products');
  };

  return (

    <Card sx={(theme) => theme.mixins.box}>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        {`${name}`}
      </Typography>
      <Img src={image[0]} sx={{ height: 200, width: '100%' }} alt="" />
      <Typography variant="h6" component="p">
        {`${categoryIds}`}
      </Typography>
      <Typography variant="body1">{`${price}`}</Typography>
      <Box sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2,
      }}
      >
        {/* <Box sx={{ width: '70px' }}>
          <NumberPicker defaultValue={1} min={1} max={5} />
        </Box> */}
        <Container sx={{ display: 'inline-flex', gap: 2 }}>
          <ProductCardUpdate id={id} />
          <Button variant="contained" color="error" sx={{ display: 'flex', gap: 3 }} onClick={handleDelete}>
            <DeleteForeverIcon />
            Delete
          </Button>
        </Container>
      </Box>
    </Card>
  );
};

export default DeleteUpdateProducts;
