import React, { useEffect, useState } from 'react';
import {
  Typography, Container, Paper, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, InputAdornment,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useNavigate } from 'react-router-dom';
import { useRootSelector } from '../../store/hooks';
import { selectUser } from '../../store/selectors';

const CreateProduct: React.FC = () => {
  const user = useRootSelector(selectUser);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [image, setImage] = useState(['']);
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product = {
      name, image, price, category,
    };
    fetch('http://localhost:8000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    }).then(() => {
      console.log('new product added');
      navigate('/products');
    });
  };

  return (
    <Container sx={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <Typography
        component="h1"
        variant="h3"
        sx={{
          textAlign: 'center', mt: 15,
        }}
      >
        {`Hello, ${user?.email}`}
      </Typography>
      <Paper sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: { xs: '100%', sm: '100%', md: '500px' }, mt: 3, py: 3,
      }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
          Create new product
          {' '}
          <AddBoxOutlinedIcon />
        </Typography>
        <Container sx={{
          mt: 1,
        }}
        >
          <form
            style={{
              display: 'flex', flexDirection: 'column', gap: 15,
            }}
            onSubmit={handleSubmit}
          >
            <TextField type="text" required value={name} onChange={(e) => setName(e.target.value)} label="Product name" />
            <TextField type="url" required value={image} onChange={(e) => setImage([e.target.value])} label="Image URL" />
            <TextField type="text" required value={price} onChange={(e) => setPrice(e.target.value)} label="Price in €" InputProps={{ endAdornment: <InputAdornment position="end">€</InputAdornment> }} />
            <FormControl required>
              <FormLabel>Category</FormLabel>
              <RadioGroup row value={category} onChange={(e) => setCategory(e.target.value)}>
                <FormControlLabel value="candlestick" control={<Radio />} label="Candlestick" />
                <FormControlLabel value="candle" control={<Radio />} label="Candle" />
              </RadioGroup>
            </FormControl>
            <Button type="submit" variant="contained">Add product</Button>
          </form>
        </Container>
      </Paper>
    </Container>
  );
};

export default CreateProduct;
