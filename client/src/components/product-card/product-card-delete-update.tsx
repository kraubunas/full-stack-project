import {
  Card, Typography, Button, Box, Container,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Product from '../../types/products';
import Img from '../img';
import 'react-widgets/styles.css';
import { useRootDispatch } from '../../store/hooks';
import ProductCardUpdate from './product-card-update';

type ProductCardProps = Product;

const DeleteUpdateProducts: React.FC<ProductCardProps> = ({
  id, name, category, price, image, itemId, amount,
}) => {
  const dispatch = useRootDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch(`http://localhost:8000/products/${id}`, {
      method: 'DELETE',
    }).then(() => {
      console.log('delete action');
      navigate('/products');
    });
  };
  const handleUpdate = () => {

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
        <Container sx={{ display: 'inline-flex', gap: 2 }}>
          <Button variant="contained" color="warning" sx={{ display: 'flex', gap: 3 }} onClick={handleUpdate}>
            <UpdateIcon />
            Update
          </Button>
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
